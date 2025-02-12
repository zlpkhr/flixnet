'use client';

import { useState, useEffect } from 'react';
import SearchHeader from './SearchHeader';
import FilterBar from './FilterBar';
import MovieGrid from './MovieGrid';
import { PaginatedMovies } from '@/types/movie';
import { useSearchParams } from 'next/navigation';

function MovieGridSkeleton({ animate = true }: { animate?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`aspect-[2/3] rounded-sm bg-purple-900/20 ${animate ? 'animate-pulse' : ''}`}
        />
      ))}
    </div>
  );
}

interface EmptyStateProps {
  message: string;
  description?: string;
}

function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="relative">
      <div className="opacity-30">
        <MovieGridSkeleton animate={false} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 py-8 rounded-lg bg-black/50 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-2">{message}</h3>
          {description && (
            <p className="text-white/70">{description}</p>
          )}
        </div>
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
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || '';

  // Reset search state when query changes
  useEffect(() => {
    setIsSearching(false);
    setError(null);
  }, [currentQuery]);

  const handleSearchStateChange = (searching: boolean) => {
    setIsSearching(searching);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsSearching(false);
  };

  const renderContent = () => {
    if (isSearching) {
      return (
        <div className="container mx-auto px-4 py-8">
          <MovieGridSkeleton />
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mx-auto px-4 py-8">
          <EmptyState 
            message="Something went wrong"
            description={error}
          />
        </div>
      );
    }

    if (initialData.items.length === 0) {
      const message = currentQuery
        ? `No movies found for "${currentQuery}"`
        : "No movies available";
      const description = currentQuery
        ? "Try adjusting your search or filters"
        : "Please check back later for new movies";
      
      return (
        <div className="container mx-auto px-4 py-8">
          <EmptyState 
            message={message}
            description={description}
          />
        </div>
      );
    }

    return (
      <MovieGrid 
        initialData={initialData} 
        page={page} 
        onError={handleError}
      />
    );
  };

  return (
    <>
      <SearchHeader onSearchStateChange={handleSearchStateChange} />
      <FilterBar onSearchStateChange={handleSearchStateChange} />
      {renderContent()}
    </>
  );
} 