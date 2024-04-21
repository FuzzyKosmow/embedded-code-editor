import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { editor } from "monaco-editor";
import { ExecuteCode } from "../API";
import { useState } from "react";

interface OutputProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
  language: string;
}

const Output = ({ editorRef, language }: OutputProps) => {
  const toasts = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const runCode = async () => {
    const src = editorRef.current?.getValue();
    if (!src) return;
    try {
      setIsLoading(true);
      const { run: result } = await ExecuteCode(language, src);
      setOutput(result.output);
      result.stderr ? setIsError(true) : setIsError(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toasts({
        title: "An error occurred.",
        description: error ? String(error.message) : "Unknown error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box w="50%" bg="#110c1b" color="white" p={4}>
      <Text>Output</Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        onClick={runCode}
        isLoading={isLoading}
      >
        Run code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.500" : "gray.400"}
        borderRadius={4}
        border="1px solid"
        borderColor={isError ? "red.500" : "gray.700"}
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
