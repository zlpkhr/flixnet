import { PaginatedMovies } from "../types/movie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetMoviesParams {
  skip?: number;
  limit?: number;
  query?: string;
}

export async function getMovies({
  skip = 0,
  limit = 10,
  query,
}: GetMoviesParams = {}): Promise<PaginatedMovies> {
  const params = new URLSearchParams();

  if (skip) params.append("skip", skip.toString());
  if (limit) params.append("limit", limit.toString());
  if (query) params.append("query", query);

  const response = await fetch(`${API_BASE_URL}/movies/?${params.toString()}`, {
    cache: "no-store", // Disable caching
  });

  if (!response.ok) {
    let errorMsg = "Failed to fetch movies";
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || errorMsg;
    } catch (err) {
      // fall back to default error message
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
