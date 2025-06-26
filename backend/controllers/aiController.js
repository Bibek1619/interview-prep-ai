const {GoogleGenAi} =require("@google/genai");
const {conceptExplainPrompt}=require("../utils/prompts")
const ai = new GoogleGenAi({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
 
    });
// @desc Generate interview questions based on a topic and answer using gemini
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
    try{
        const {role, experience, topicsToFocus, numberOfQuestions} = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const prompt =questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response =await ai.models.generateContent ({
            model: "gemini-2.0-flash-lite",
        content: prompt,});

        let rawText = response.text;

        //clean it :remove ```json and ``` from beg and end

      const cleanedText = rawText
  .replace(/^```json\s*/i, "") // remove starting ```json (case-insensitive)
  .replace(/```$/, "")         // remove ending ```
  .trim();                     // remove extra whitespace


  const data = JSON.parse(cleanedText);

  res.status(200).json({
            message: "Interview questions generated successfully",
            questions: data,
        });
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ message: "No valid questions generated" });
        }
        // Return the generated questions
        res.status(200).json({
            message: "Interview questions generated successfully",
            questions: data,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error so failed to generate qsn",
            error: error.message });
         
    }
};
// @desc Generate explanation for a concept using gemini
// @route POST /api/ai/generate-explanation
//@access Private
const generateConceptExplanation = async (req, res) => {
}
module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation,
};