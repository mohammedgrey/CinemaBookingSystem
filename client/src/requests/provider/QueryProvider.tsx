// _app.jsx
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps?.dehydratedState}>{children}</Hydrate> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  );
};
export default QueryProvider;
