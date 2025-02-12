"use server";

import { getMovies } from "@/services/movieService";

export async function loadMoreMovies(page: number, query?: string) {
  const limit = 12;
  try {
    const movies = await getMovies({
      skip: page * limit,
      limit,
      query: query || undefined,
    });
    return movies;
  } catch (error) {
    throw new Error("Failed to load more movies");
  }
}
