"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import MovieCard from "./MovieCard";
import { PaginatedMovies } from '@/types/movie';

interface MovieGridProps {
  initialData: PaginatedMovies;
  page: number;
}

export default function MovieGrid({ initialData, page }: MovieGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 12;

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(searchParams.toString());
    
    if (newPage === 0) {
      current.delete('page');
    } else {
      current.set('page', newPage.toString());
    }

    const search = current.toString();
    const query = search ? `/?${search}` : '/';
    
    // Use router.replace to update URL and trigger a new server request
    router.replace(query, {
      scroll: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {initialData.items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {initialData.total > limit && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page + 1} of {Math.ceil(initialData.total / limit)}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= Math.ceil(initialData.total / limit) - 1}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
