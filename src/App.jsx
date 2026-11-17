import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            E-commerce Catalog Setup Done!
          </h1>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
