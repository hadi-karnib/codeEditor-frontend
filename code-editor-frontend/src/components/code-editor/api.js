import axios from "axios";
import { LANGUAGE_VERSIONS } from "../../constants";

const API = axios.create({ baseURL: "https://emkc.org/api/v2/piston" });

export const executeCode = async (language, sourceCode) => {
  try {
    const response = await API.post("/execute", {
      language: language, // Correctly pass the language
      version: LANGUAGE_VERSIONS[language], // Use the correct version from constants
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
};
