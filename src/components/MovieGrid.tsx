"use client";

import MovieCard from "./MovieCard";
import type { Movie } from "@/app/types/movie";

// Mock data matching the API schema
const movies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 9.0,
  },
  {
    id: "2",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.8,
  },
  {
    id: "3",
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.9,
  },
  {
    id: "4",
    title: "The Matrix",
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.7,
  },
  {
    id: "5",
    title: "Goodfellas",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.7,
  },
  {
    id: "6",
    title: "The Silence of the Lambs",
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.6,
  },
  {
    id: "7",
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.8,
  },
  {
    id: "8",
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.8,
  },
  {
    id: "9",
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 9.2,
  },
  {
    id: "10",
    title: "Schindler's List",
    description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 9.0,
  },
  {
    id: "11",
    title: "The Lord of the Rings: The Return of the King",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 9.0,
  },
  {
    id: "12",
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 9.3,
  },
  {
    id: "13",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.6,
  },
  {
    id: "14",
    title: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.5,
  },
  {
    id: "15",
    title: "The Green Mile",
    description:
      "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 8.6,
  },
];

export default function MovieGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
