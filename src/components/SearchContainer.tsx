'use client';

import { useState } from 'react';
import SearchHeader from './SearchHeader';
import FilterBar from './FilterBar';
import MovieGrid from './MovieGrid';
import { PaginatedMovies } from '@/types/movie';

function MovieGridSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse rounded-sm bg-purple-900/20"
          />
        ))}
      </div>
    </div>
  );
}

interface SearchContainerProps {
  initialData: PaginatedMovies;
  page: number;
}

export default function SearchContainer({ initialData, page }: SearchContainerProps) {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <>
      <SearchHeader onSearchStateChange={setIsSearching} />
      <FilterBar />
      {isSearching ? (
        <MovieGridSkeleton />
      ) : (
        <MovieGrid initialData={initialData} page={page} />
      )}
    </>
  );
} 