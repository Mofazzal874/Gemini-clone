// Import the Generative AI SDK using ES6 import syntax
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Use the environment variable for the API key
const apiKey = import.meta.env.VITE_API_KEY;



// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Async function to send a prompt to the generative model
async function run(prompt) {
  // Start a new chat session
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  // Send the message and receive the result
  const result = await chatSession.sendMessage(prompt);
  
  // Log the response text to the console
  console.log(result.response.text());

  return result.response.text() ; //return the response function to the caller..here it is onSent()
}

export default run;
