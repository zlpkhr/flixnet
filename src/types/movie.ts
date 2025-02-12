export interface Movie {
  id: string;
  title: string;
  description: string;
  image_url: string;
  rating: number;
}

export interface PaginatedMovies {
  total: number;
  items: Movie[];
}

export interface MovieData {
  pages: {
    items: Movie[];
    total: number;
  }[];
  pageParams: number[];
  items: Movie[];
  total: number;
}
