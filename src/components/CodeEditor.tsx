/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constant";

const CodeEditor = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState(CODE_SNIPPETS.javascript);
  const [language, setLanguage] = useState("javascript");
  const onMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelectLanguage = (language: string) => {
    setLanguage(language);

    setValue(CODE_SNIPPETS[language]);
  };
  return (
    <Box id="code-editor">
      <HStack spacing={4} mb={4}>
        <Box w="50%">
          <LanguageSelector
            language={language}
            onSelectLanguage={onSelectLanguage}
          />
          <Editor
            height="75vh"
            theme="vs-dark"
            defaultLanguage={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onChange={(value) => {
              value ? setValue(value) : setValue("");
            }}
            onMount={onMount}
          />
          ;
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
