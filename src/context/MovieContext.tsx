"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

  useEffect(() => {
    const fetchMovies = async () => {
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
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Reset to first page when search query changes
    if (page !== 0 && searchQuery) {
      setPage(0);
    } else {
      fetchMovies();
    }
  }, [page, searchQuery]);

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