"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SearchHeaderProps {
  onSearchStateChange?: (isSearching: boolean) => void;
}

export default function SearchHeader({ onSearchStateChange }: SearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');
  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentQuery = params.get('query') || '';
    
    // Set searching state immediately when input changes
    onSearchStateChange?.(debouncedSearch !== currentQuery);
    
    if (debouncedSearch !== currentQuery) {
      if (debouncedSearch) {
        params.set('query', debouncedSearch);
      } else {
        params.delete('query');
      }
      params.delete('page'); // Reset to first page on search
      router.push(`/?${params.toString()}`);
    }
  }, [debouncedSearch, router, searchParams, onSearchStateChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Trigger searching state immediately
    onSearchStateChange?.(true);
  };

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
            onChange={handleInputChange}
          />
        </div>
      </div>
    </header>
  );
}
