"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Movie } from "@/types/movie";
import { getMovies } from "@/services/movieService";

interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  setPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  limit: number;
  refetch: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 12;

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMovies({
        skip: page * limit,
        limit: limit,
        query: searchQuery || undefined,
      });
      setMovies(response.items);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message || "Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery]);

  useEffect(() => {
    // When search query changes and page is not 0, reset page to 0
    if (searchQuery && page !== 0) {
      setPage(0);
    } else {
      fetchMovies();
    }
  }, [page, searchQuery, fetchMovies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        total,
        page,
        setPage,
        searchQuery,
        setSearchQuery,
        limit,
        refetch: fetchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
} 