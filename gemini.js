import axios from "axios";

// const API_KEY = "AIzaSyAfcJBR9TpHH6_kehYtOiVIZpMwXb-KUgY";
const API_KEY = "AIzaSyBz22uxf-DHusPfbv4G7DvI7Ngw1pV73uE";


export const sendToGemini = async (message) => {
  try {

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await axios.post(url, {
      contents: [ {
          parts: [{ text: message }]
        }
      ]
    });

    const text =
      response.data.candidates[0].content.parts[0].text;

    return text;

  } catch (error) {

    console.log("Gemini API error:", error.response?.data || error);

    return "AI response error";

  }
};