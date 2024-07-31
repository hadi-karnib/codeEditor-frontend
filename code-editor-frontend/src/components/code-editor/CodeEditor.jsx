import { Box, HStack, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../../components/code-editor/LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchAICompletion from "./copilot";

const CodeEditor = ({ fileId }) => {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    const getCode = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/getCode",
          { id: fileId },
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
  }, [fileId]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.getModel().onDidChangeContent(async (event) => {
      const changes = event.changes;
      const lastChange = changes[changes.length - 1];
      const range = lastChange.range;
      const lineContent = editor.getModel().getLineContent(range.endLineNumber);

      if (lineContent.trim().startsWith("///")) {
        const command = lineContent.trim().substring(3).trim(); // Adjusted index
        console.log("Command to process:", command); // Debug log
        if (command.length > 0) {
          const completion = await fetchAICompletion(command);
          console.log("AI Completion:", completion); // Debug log
          if (completion) {
            editor.getModel().applyEdits([
              {
                range: {
                  startLineNumber: range.endLineNumber,
                  startColumn: 1,
                  endLineNumber: range.endLineNumber,
                  endColumn: lineContent.length + 1,
                },
                text: completion,
              },
            ]);
            editor.setPosition({
              lineNumber: range.endLineNumber + 1,
              column: 1,
            });
            editor.focus();
          }
        }
      }
    });
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
          id: fileId, // Include the ID here
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
      toast.success("file updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating code:", error);
      toast.error("file not updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <Box h={"100%"}>
      <ToastContainer />

      <HStack spacing={4} px={"55px"}>
        <Box w="50%" h={"100%"}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              width: "100%",
            }}
          >
            <Button
              variant="outline"
              color="#0582ca"
              colorScheme="green"
              mt={9}
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
