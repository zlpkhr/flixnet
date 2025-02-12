'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchContextType {
  query: string;
  setSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const debouncedQuery = useDebounce(query, 300);

  // Update URL when debounced query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set('query', debouncedQuery);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, pathname, router, searchParams]);

  const setSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  return (
    <SearchContext.Provider value={{ query, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
} 