"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import MovieCard from "./MovieCard";
import { Movie, PaginatedMovies } from '@/types/movie';
import { loadMoreMovies } from '@/app/actions';

interface MovieGridProps {
  initialData: PaginatedMovies;
  page: number;
  onError?: (error: string) => void;
}

function MovieCardSkeleton() {
  return (
    <div className="aspect-[2/3] animate-pulse rounded-sm bg-purple-900/20" />
  );
}

export default function MovieGrid({ initialData, page, onError }: MovieGridProps) {
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
        {isLoading && (
          <>
            {Array.from({ length: limit }).map((_, i) => (
              <MovieCardSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>
      
      {hasMore && !isLoading && (
        <div ref={observerTarget} className="h-4" /> // Hidden observer target
      )}
    </div>
  );
}
