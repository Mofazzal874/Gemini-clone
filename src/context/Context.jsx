import { createContext, useState } from "react";
import run from "../config/gemini";
import './Context.css';

// Create Context
export const Context = createContext();

const ContextProvider = (props) => {
  // State variables
  const [input, setInput] = useState(""); // Input from user
  const [recentPrompt, setRecentPrompt] = useState(""); // Save the input to show in chat
  const [prevPrompts, setPrevPrompts] = useState([]); // Save previous prompts
  const [showResult, setShowResult] = useState(false); // Display chat box when prompt is sent
  const [loading, setLoading] = useState(false); // Show loading animation
  const [resultData, setResultData] = useState(""); // Store the result data from the server

  // Function to process the response and format it with HTML
  const formatResponse = (response) => {
    let insideCodeBlock = false;
  
    let newResponse = response
      .split("\n")
      .map(line => {
        if (line.startsWith("## ")) {
          // Handle headings (##)
          return `<h2>${line.slice(3)}</h2>`;
        } else if (line.startsWith("```")) {
          // Toggle code block display
          insideCodeBlock = !insideCodeBlock;
          return insideCodeBlock ? "<pre><code>" : "</code></pre>";
        } else if (insideCodeBlock) {
          // If inside a code block, leave content as-is
          return line;
        } else if (line.startsWith("* ") || line.startsWith("- ")) {
          // Handle list items (* or -)
          const listItemText = line.slice(2).trim(); // Remove the leading * or -
          // Handle bold text within the list item
          const formattedText = listItemText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
          return `<li>${formattedText}</li>`;
        } else if (line.match(/`.*?`/)) {
          // Handle inline code (`code`)
          return line.replace(/`(.*?)`/g, "<code>$1</code>");
        } else if (line.match(/\*\*(.*?)\*\*/)) {
          // Handle bold text (**bold**)
          return line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        } else {
          // Default paragraph handling
          return `<p>${line}</p>`;
        }
      })
      .join("");
  
    return newResponse;
  };
  
  
  
  // Function triggered when user sends input
  const onSent = async (prompt) => {
    setResultData(""); // Clear the previous result data
    setLoading(true); // Show loading animation
    setShowResult(true); // Display the chat box
    setRecentPrompt(input); // Store the recent prompt

    const response = await run(input); // Send the input to the server through API and get the response

    const formattedResponse = formatResponse(response); // Format the response using the helper function
    setResultData(formattedResponse); // Store the formatted response
    setLoading(false); // Hide the loading animation
    setInput(""); // Clear the input field
  };

  // Context value with all state and functions for child components
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
