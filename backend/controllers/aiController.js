const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// Create Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// 🧠 Utility: Format code blocks with proper Markdown and visual dividers
function formatCodeBlocks(text) {
  return text
    // Match opening code blocks like ```js or ```
    .replace(/```(\w+)?\n?/gi, (match, lang) => {
      const language = lang || "";
      return `\n// -----------------------------\n//         Code Example (${language})\n// -----------------------------\n\`\`\`${language}\n`;
    })
    // Keep closing code block fences
    .replace(/```/g, "```");
}

// @desc Generate interview questions based on a topic
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    // Clean only the opening ```json and the closing ``` at the end
    const cleanedText = rawText.replace(/```json/gi, "").replace(/```$/, "").trim();

    const data = JSON.parse(cleanedText);

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No valid questions generated" });
    }

    // Format answers with code fences and comment lines
    const formattedData = data.map((item) => ({
      question: item.question,
      answer: formatCodeBlocks(item.answer),
    }));

    res.status(200).json({
      message: "Interview questions generated successfully",
      questions: formattedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error - Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc Generate explanation for a concept
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Please provide a concept" });
    }

    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    // Same cleaning here: remove only wrapper triple backticks
    const cleanedText = rawText.replace(/```json/gi, "").replace(/```$/, "").trim();
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server Error - Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
