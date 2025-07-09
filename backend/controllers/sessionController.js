const Session =require('../models/Session');
const Question =require('../models/Question');


// @desc Create a new session
// @route POST /api/sessions/create
// @access Private

exports.createSession = async (req, res) => {
    try{

      const { role, experience, topicsToFocus, description, questions } = req.body;
const userId = req.user._id;

const session = await Session.create({
  user: userId,
  role,
  experience,
  topicsToFocus,
  description
});

const questionDocs = await Promise.all(
  questions.map(async (q) => {
    const question = await Question.create({
      session: session._id,
      question: q.question,
      answer: q.answer,
    });
    return question._id;
  })
);
session.questions = questionDocs;
await session.save();
res.status(201).json({
    success: true,
    message: 'Session created successfully',
     session,
});


    }catch (error) {
  console.error('Error creating session:', error);
  return res.status(500).json({ success: false, message: 'Server error', error: error.message });
}
};
// @desc Get session by ID
// @route GET /api/sessions/:id
// @access Private
exports.getMySessions =async (req, res) => {
     try{

        const sessions =await Session.find({user:req.user.id})
        .sort({createdAT:-1})
            .populate("questions");
            res.status(200).json(sessions)
    
    }catch(error){
        res.status(500).json({  success:false,message: 'Server error' });
};
}

// @desc Get session by ID with populated questions
// @route GET /api/sessions/:id
// @access Private
exports.getSessionById=async (req, res) => {  try{

const session=await Session.findById(req.params.id)
.populate({
    path: 'questions',
    options: { sort: {isPinned: -1, createdAt: -1 } },
})
.exec();
if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
}

res.status(200).json({
    success: true,
    
    data: session
})


    }catch(error){
        res.status(500).json({  success:false,message: 'Server error' });
    }
};

// @desc Delete a session and its questions
// @route DELETE /api/sessions/:id
// @access Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    // ✅ Handle case where session is not found
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    // ✅ Check if the session belongs to the user
    if (session.user.toString() !== req.user._id.toString()) {
  return res.status(401).json({ message: 'Not authorized to delete this session' });
}


    // ✅ Delete associated questions
    await Question.deleteMany({ session: session._id });

    // ✅ Delete session
    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Session deleted successfully'
    });

  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
