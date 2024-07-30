import { Box, HStack, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../../components/code-editor/LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";
import axios from "axios";

const CodeEditor = () => {
  const id = "4";
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    const getCode = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/getCode",
          { id: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setValue(response.data.data.source_code); // Assuming response contains the code in this structure
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
    getCode();
  }, [id]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const submitCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/updateCode",
        {
          id: id, // Include the ID here
          source_code: sourceCode,
          language: language,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating code:", error);
    }
  };

  return (
    <Box h={"100%"}>
      <HStack spacing={4} px={"55px"}>
        <Box w="50%" h={"100%"}>
          <div style={{ display: "flex", gap: "20px", width: "100%" }}>
            <Button
              variant="outline"
              color="#0582ca"
              colorScheme="green"
              mb={4}
              onClick={submitCode}
            >
              Submit
            </Button>
            <LanguageSelector language={language} onSelect={onSelect} />
          </div>
          <Editor
            defaultLanguage={language}
            language={language}
            theme="vs-dark"
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
            height="calc(100vh - 50px)"
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
