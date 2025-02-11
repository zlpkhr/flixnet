import { PaginatedMovies } from '../types/movie';

const API_BASE_URL = 'https://november7-730026606190.europe-west1.run.app';

interface GetMoviesParams {
  skip?: number;
  limit?: number;
  query?: string;
}

export async function getMovies({ skip = 0, limit = 10, query }: GetMoviesParams = {}): Promise<PaginatedMovies> {
  const params = new URLSearchParams();
  
  if (skip) params.append('skip', skip.toString());
  if (limit) params.append('limit', limit.toString());
  if (query) params.append('query', query);

  const response = await fetch(`${API_BASE_URL}/movies/?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
} 