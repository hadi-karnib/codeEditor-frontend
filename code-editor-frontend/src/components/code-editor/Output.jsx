import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { executeCode } from "./api";

const Output = ({ editorRef, language }) => {
  const [responseOutput, setResponseOutput] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }
    try {
      const data = await executeCode(language, sourceCode);
      setResponseOutput(data.run.output);
      console.log(data.run.output);
    } catch (error) {
      console.error("Error executing code:", error);
      setResponseOutput("An error occurred while executing the code.");
    }
  };

  return (
    <Box w="50%" h="100%" mb={40} pt={8}>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Text mb={2} fontSize="lg" color="#0582ca">
          Output
        </Text>
        <Button
          variant="outline"
          color="#0582ca"
          colorScheme="green"
          mb={4}
          onClick={runCode}
        >
          Run Code
        </Button>
      </Box>
      <Box
        h="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        display={"flex"}
        borderColor="#fff"
        color="#0582ca"
        overflowY="auto"
        whiteSpace="pre-wrap" // Ensures that new lines are preserved
      >
        <pre>{responseOutput}</pre>
      </Box>
    </Box>
  );
};

export default Output;
