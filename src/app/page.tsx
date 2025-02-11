import { Suspense } from 'react';
import { getMovies } from '@/services/movieService';
import SearchContainer from '@/components/SearchContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlixNet - Movie Discovery',
  description: 'Discover and explore your favorite movies',
};

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: HomePageProps) {
  // Safely extract and parse the search parameters
  const pageParam = typeof searchParams.page === 'string' ? searchParams.page : '0';
  const queryParam = typeof searchParams.query === 'string' ? searchParams.query : '';

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
        <SearchContainer initialData={movies} page={page} />
      </main>
    );
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch movies');
  }
}
