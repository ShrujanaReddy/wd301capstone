import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from '../../config/constants';
async function summarizeArticle(articleContent: string): Promise<string> {
  
// Initialize the GoogleGenerativeAI instance with the API key
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the model to be used for generating the summary
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates a summary for the given article content.
 *
 * @param {string} articleContent - The content of the article to summarize.
 * @returns {Promise<string>} - A promise that resolves to the generated summary.
 */
  try {
    // Define the prompt with the article content
    const prompt = `Summarize the following content in 50 words:\n\n${articleContent}`;

    // Generate content using the model
    const result = await model.generateContent(prompt);

    // Return the generated summary'
    console.log(result.response.text())
    return result.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary.");
  }
}

export default summarizeArticle;
