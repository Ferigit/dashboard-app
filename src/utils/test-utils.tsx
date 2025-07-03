import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function renderWithProviders(
  ui: ReactNode,
  { route = '/', ...options } = {}
) {
  window.history.pushState({}, 'Test page', route);
  
  const testQueryClient = createTestQueryClient();
  
  return render(
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        {ui}
      </QueryClientProvider>
    </BrowserRouter>,
    options
  );
}

export * from '@testing-library/react';
export { renderWithProviders as render };