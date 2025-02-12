"use client";

import { useEffect, useRef } from 'react';
import MovieCard from "./MovieCard";
import { useMovies } from '@/hooks/useMovies';
import { useSearchParams } from 'next/navigation';

function MovieCardSkeleton() {
  return (
    <div className="aspect-[2/3] animate-pulse rounded-sm bg-purple-900/20" />
  );
}

function GridLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {children}
      </div>
    </div>
  );
}

function EmptyState({ query }: { query?: string }) {
  return (
    <div className="relative">
      <div className="opacity-30">
        <GridLayout>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-sm bg-purple-900/20" />
          ))}
        </GridLayout>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 py-8 rounded-lg bg-black/50 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-2">
            {query ? `No movies found for "${query}"` : "No movies available"}
          </h3>
          <p className="text-white/70">
            {query ? "Try adjusting your search or filters" : "Please check back later for new movies"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MovieGrid() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || undefined;
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useMovies({ query });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && fetchNextPage(),
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <EmptyState query={`Error: ${error instanceof Error ? error.message : 'Failed to load movies'}`} />
    );
  }

  if (isLoading) {
    return (
      <GridLayout>
        {Array.from({ length: 12 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </GridLayout>
    );
  }

  if (!data?.items.length) {
    return <EmptyState query={query} />;
  }

  return (
    <GridLayout>
      {data.items.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {isFetchingNextPage && (
        Array.from({ length: 12 }).map((_, i) => (
          <MovieCardSkeleton key={`skeleton-${i}`} />
        ))
      )}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={observerTarget} className="h-4" />
      )}
    </GridLayout>
  );
}
