"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import MovieCard from "./MovieCard";
import { Movie, PaginatedMovies } from '@/types/movie';
import { loadMoreMovies } from '@/app/actions';

interface MovieGridProps {
  initialData: PaginatedMovies;
  page: number;
}

export default function MovieGrid({ initialData, page }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>(initialData.items);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.total > movies.length);
  const observerTarget = useRef<HTMLDivElement>(null);
  const limit = 12;

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = Math.floor(movies.length / limit);
    
    try {
      const data = await loadMoreMovies(nextPage);
      if (data.items.length > 0) {
        setMovies(prev => [...prev, ...data.items]);
        setHasMore(data.total > movies.length + data.items.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, movies.length]);

  useEffect(() => {
    // Reset state when initial data changes
    setMovies(initialData.items);
    setHasMore(initialData.total > initialData.items.length);
  }, [initialData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {hasMore && (
        <div 
          ref={observerTarget}
          className="flex justify-center items-center p-4 mt-4"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500" />
          ) : (
            <div className="h-8" /> // Spacer for intersection observer
          )}
        </div>
      )}
    </div>
  );
}
