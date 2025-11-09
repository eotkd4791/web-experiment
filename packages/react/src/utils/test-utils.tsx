import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { Suspense, type PropsWithChildren, type ReactNode } from "react";

export function renderWithQueryClient(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

export function wrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function suspenseWrapper({ children, fallback }: PropsWithChildren<{ fallback?: ReactNode }>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </QueryClientProvider>
  );
}
