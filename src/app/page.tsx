import { Suspense } from 'react';
import { getMovies } from '@/services/movieService';
import MovieGrid from '@/components/MovieGrid';
import SearchHeader from '@/components/SearchHeader';
import FilterBar from '@/components/FilterBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlixNet - Movie Discovery',
  description: 'Discover and explore your favorite movies',
};

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  // Safely extract and parse the search parameters
  const pageParam = typeof params.page === 'string' ? params.page : '0';
  const queryParam = typeof params.query === 'string' ? params.query : '';

  // Parse page number from URL, defaulting to 0 if not present or invalid
  const currentPage = Number(pageParam);
  const page = isNaN(currentPage) ? 0 : Math.max(0, currentPage);
  const limit = 12;

  try {
    const movies = await getMovies({
      skip: page * limit,
      limit,
      query: queryParam || undefined,
    });

    return (
      <main className="min-h-screen">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[#0f0a1f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-800/5 to-transparent" />
        </div>
        <SearchHeader />
        <FilterBar />
        <Suspense fallback={<MovieGridSkeleton />}>
          <MovieGrid initialData={movies} page={page} />
        </Suspense>
      </main>
    );
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch movies');
  }
}

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
