"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from '@/contexts/SearchContext';
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchHeader() {
  const { query, setSearch } = useSearch();
  const [inputValue, setInputValue] = useState(query);
  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies..."
            className="w-full border-white/10 bg-white/5 pl-9 focus-visible:ring-white/20"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
