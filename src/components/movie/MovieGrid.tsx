"use client";

import { useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { useMovies } from "@/hooks/useMovies";
import { useSearchParams } from "next/navigation";
import type { Movie, MovieData } from "@/types/movie";
import GridLayout from "./GridLayout";
import MovieCardSkeleton from "./MovieCardSkeleton";
import EmptyState from "./EmptyState";

export default function MovieGrid() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || undefined;
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useMovies({ query });

  const transformedData = data as MovieData | undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries[0].isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        fetchNextPage(),
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <EmptyState
        query={`Error: ${error instanceof Error ? error.message : "Failed to load movies"}`}
      />
    );
  }

  if (isLoading && !transformedData?.items?.length) {
    return (
      <GridLayout>
        {Array.from({ length: 12 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </GridLayout>
    );
  }

  if (!transformedData?.items?.length) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm">
          <GridLayout>
            {Array.from({ length: 12 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </GridLayout>
        </div>
      )}
      <GridLayout>
        {transformedData.items.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
        {hasNextPage && !isFetchingNextPage && (
          <div ref={observerTarget} className="h-4" />
        )}
      </GridLayout>
    </div>
  );
}
