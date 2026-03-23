import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


function gemini() {
  const response =  ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Explain how AI works in a few words",
  });

  return (
    <>
    <h1>{response}</h1>
    </>
  )
 
}

export default gemini;