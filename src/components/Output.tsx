import { Box, Button, Text } from "@chakra-ui/react";
import { editor } from "monaco-editor";
import { ExecuteCode } from "../API";
import { useState } from "react";

interface OutputProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
  language: string;
}

const Output = ({ editorRef, language }: OutputProps) => {
  const [output, setOutput] = useState(null);
  const runCode = async () => {
    const src = editorRef.current?.getValue();
    if (!src) return;
    try {
      const { run: result } = await ExecuteCode(language, src);
      setOutput(result.output);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box w="50%" bg="#110c1b" color="white" p={4}>
      <Text>Output</Text>
      <Button variant="outline" colorScheme="green" mb={4} onClick={runCode}>
        Run code
      </Button>
      <Box
        height="75vh"
        p={2}
        borderRadius={4}
        border="1px solid"
        borderColor="#333"
      >
        {output ? (
          <pre>{output}</pre>
        ) : (
          <Text color="gray.400"> Click run code to see the output</Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;
