import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '@/services/movieService';
import { PaginatedMovies } from '@/types/movie';

interface UseMoviesOptions {
  query?: string;
  limit?: number;
}

export function useMovies({ query, limit = 12 }: UseMoviesOptions = {}) {
  return useInfiniteQuery({
    queryKey: ['movies', { query }],
    queryFn: async ({ pageParam = 0 }) => {
      return getMovies({
        skip: pageParam * limit,
        limit,
        query: query || undefined,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce((total, page) => total + page.items.length, 0);
      return loadedItems < lastPage.total ? allPages.length : undefined;
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      items: data.pages.flatMap(page => page.items),
      total: data.pages[0]?.total ?? 0,
    }),
  });
} 