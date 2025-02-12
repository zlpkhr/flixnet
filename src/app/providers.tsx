'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from '@/contexts/SearchContext';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        {children}
      </SearchProvider>
    </QueryClientProvider>
  );
} 