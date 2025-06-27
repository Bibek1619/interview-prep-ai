const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI that generates interview questions and answers.

Task:
- Role: ${role}
- Experience: ${experience} years
- Focus Topics: ${topicsToFocus}


- Write ${numberOfQuestions} interview questions. 
- For each question, generate a detailed but beginner-friendly answer. 
- If the answer needs a code example,add a small code block inside.
-keep formatting very clean.
-Retutn a pure JSON array like:

[
  {
    "question": "Question here?",
    "answer": "Answer here."
  }
]

Important: Do NOT add any extra text. Only return valid JSON.
`);

const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
-Question: "${question}"
- after the explanation ,provide a short clear title that summarizes the concept for the article or page header .
- keep the formatting very clean and clear.

- return the result as a valid JSON in the following format:



Return the result as valid JSON in the following format:

{
  "title": "Short concept title here",
  "explanation": "Detailed explanation here..."
}

Important: Do NOT add any extra text outside the JSON format.only return valid JSON.
`);

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
