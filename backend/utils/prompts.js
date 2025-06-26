const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI that generates interview questions for a frontend developer.

User Profile:
- Role: ${role}
- Experience: ${experience}
- Topics to focus on: ${topicsToFocus}

Task:
- Generate ${numberOfQuestions} interview questions related to the above.
- For each question, also include a sample answer.
- Keep questions realistic and relevant to frontend development.

Return only valid JSON in this format:

[
  {
    "question": "Explain event delegation in JavaScript.",
    "answer": "Event delegation is..."
  },
  ...
]

Important: Do NOT add any extra text. Only return valid JSON.
`);

const conceptExplainPrompt = (question) => (`
You are an AI trained to explain technical interview questions to beginner developers.

Task:
- Explain the following interview question in simple, clear terms.
- Include any relevant concepts and beginner-friendly explanations.
- If helpful, include a small, readable code example.
- End with a short, clear title summarizing the concept.

Question: "${question}"

Return the result as valid JSON in the following format:

{
  "title": "Short concept title here",
  "explanation": "Detailed explanation here..."
}

Important: Only return valid JSON. No extra text.
`);

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};