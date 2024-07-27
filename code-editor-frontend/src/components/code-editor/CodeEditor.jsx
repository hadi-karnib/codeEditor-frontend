import { Box } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../../components/code-editor/LanguageSelector";

const CodeEditor = () => {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const [language, setlanguage] = useState("javascript");
  const onSelect = (language) => {
    setlanguage(language);
  };
  return (
    <Box w="50%" h="75%" p="0 60px">
      <LanguageSelector language={language} onSelect={onSelect} />
      <Editor
        defaultLanguage="javascript"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(value) => setValue(value)}
        onMount={onMount}
      />
    </Box>
  );
};

export default CodeEditor;
