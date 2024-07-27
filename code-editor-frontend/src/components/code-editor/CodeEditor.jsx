import { Box, HStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../../components/code-editor/LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";

const CodeEditor = () => {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const [language, setlanguage] = useState("python");
  const onSelect = (language) => {
    setlanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  return (
    <Box h={"100%"}>
      <HStack spacing={4} px={"55px"}>
        <Box w="50%" h={"100%"}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            defaultLanguage={CODE_SNIPPETS[language]}
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
