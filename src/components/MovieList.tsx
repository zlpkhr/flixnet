"use client";

import { useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

// Mock data for movies
const movies = [
  { id: 1, title: "Inception", year: 2010, director: "Christopher Nolan" },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
  },
  {
    id: 3,
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
  },
  { id: 4, title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino" },
  {
    id: 5,
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
  },
  { id: 6, title: "Forrest Gump", year: 1994, director: "Robert Zemeckis" },
  { id: 7, title: "The Matrix", year: 1999, director: "The Wachowskis" },
  { id: 8, title: "Goodfellas", year: 1990, director: "Martin Scorsese" },
  {
    id: 9,
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    director: "George Lucas",
  },
  {
    id: 10,
    title: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
  },
  // Add more movies as needed
];

const ITEMS_PER_PAGE = 5;

export default function MovieList() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastMovie = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - ITEMS_PER_PAGE;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={movies.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
