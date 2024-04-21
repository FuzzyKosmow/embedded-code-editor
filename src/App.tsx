import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <Box
      color={"gray.500"}
      bg="0f0a19"
      px={6}
      py={8}
      id="app"
      minHeight={"100vh"}
    >
      <CodeEditor />
    </Box>
  );
}

export default App;
