import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Example from "./examples/re-rendering";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

export default App;
