'use client';

import { useEffect } from 'react';
import SearchHeader from '@/components/SearchHeader';
import FilterBar from '@/components/FilterBar';

function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[2/3] rounded-sm bg-purple-900/20"
        />
      ))}
    </div>
  );
}

function ErrorState({ message, reset }: { message: string; reset: () => void }) {
  return (
    <div className="relative">
      <div className="opacity-30">
        <MovieGridSkeleton />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 py-8 rounded-lg bg-black/50 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
          <p className="text-white/70 mb-4">{message}</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0f0a1f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-800/5 to-transparent" />
      </div>
      <SearchHeader />
      <FilterBar />
      <div className="container mx-auto px-4 py-8">
        <ErrorState message={error.message} reset={reset} />
      </div>
    </main>
  );
} 