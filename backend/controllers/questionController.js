const Question = require("../models/Question");
const Session = require("../models/Session");
// @desc Add additional questions to an existing session
// @route POST /api/questions/add
// @access Private
exports.addQuestionsToSession = async (req, res) => {
try {
const { sessionId, questions } = req.body;
if (!sessionId || !questions || !Array.isArray(questions)) {
return res.status(400).json({ message: "Invalid request data" });
}
const session = await Session.findById(sessionId);
if (!session) {
return res.status(404).json({ message: "Session not found" });
}


// Create new questions and associate them with the session
const createdQuestions = await Question.insertMany(
questions.map((q) => ({
    session : sessionId,
    question: q.question,
    answer: q.answer,
}))
);

// Add the new questions to the session's questions array
session.questions.push(...createdQuestions.map(q => q._id));
await session.save();
res.status(201).json({
    message: "Questions added successfully",
    questions: createdQuestions,
});

} catch (error) {
res.status(500).json({ message: "Server Error" });
}
};
// @desc Pin or unpin a question
// @route POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    // Toggle the isPinned flag
    question.isPinned = !question.isPinned;
    await question.save();

    // ✅ Send a response
    return res.status(200).json({
      success: true,
      message: `Question ${question.isPinned ? 'pinned' : 'unpinned'} successfully.`,
      data: question,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc Update a note for a question
// @route POST /api/questions/:id/note
// @access Private



exports.updateQuestionNote = async (req, res) => {
    try{
        const {note}=req.body;
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }
        // Update the note field
        question.note = note ||"";
        await question.save();
        // ✅ Send a response
        return res.status(200).json({
            success: true,
            message: "Note updated successfully.",
            data: question,
        });

    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
    
};