import axios from "axios";
import { toast } from "react-toastify";

const fetchAICompletion = async (command) => {
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_chatgpt_key}`,
    "Content-Type": "application/json",
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Provide the complete code for the following task and only the code i dont want any word form you moreover when i ask for a function specifically give me the function i want no html or css just assume i have those:\n\n${command}`,
      },
    ],
    max_tokens: 1000, // Allow more tokens for a longer response
    temperature: 0.5,
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      { headers }
    );

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      return response.data.choices[0].message.content; // Return the full text of the completion
    } else {
      throw new Error("No completion found or unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching AI completion:", error);
    toast.error("Error fetching AI completion!");
    return ""; // Return empty string or handle error appropriately
  }
};

export default fetchAICompletion;
