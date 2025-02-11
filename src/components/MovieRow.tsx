"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/app/types/movie";

// Mock data matching the API schema
const movies: Movie[] = [
  {
    id: "1",
    title: "Harry Potter and the Philosopher's Stone",
    description:
      "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 7.6,
  },
  {
    id: "2",
    title: "Shazam!",
    description:
      "A newly fostered young boy in search of his mother instead finds unexpected super powers and soon gains a powerful enemy.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 7.0,
  },
  {
    id: "3",
    title: "You've Got Mail",
    description:
      "Two business rivals who despise each other in real life unwittingly fall in love over the Internet.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 6.9,
  },
  {
    id: "4",
    title: "Elf",
    description:
      "After discovering he is a human, a man raised as an elf at the North Pole decides to travel to New York City to locate his real father.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 7.1,
  },
  {
    id: "5",
    title: "Happy Feet",
    description:
      "Into the world of the Emperor Penguins, who find their soul mates through song, a penguin is born who cannot sing.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 6.4,
  },
  {
    id: "6",
    title: "A Christmas Mystery",
    description:
      "A holiday mystery that follows a young girl who discovers a mysterious key that unlocks a world of adventure.",
    image_url: "/placeholder.svg?height=600&width=400",
    rating: 6.8,
  },
];

interface MovieRowProps {
  title: string;
}

export default function MovieRow({ title }: MovieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative px-4 md:px-8">
      <h2 className="mb-4 text-xl font-medium">{title}</h2>
      <div className="group relative">
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex space-x-4 overflow-x-scroll"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute bottom-0 left-0 top-0 flex w-12 items-center justify-center opacity-0 transition-opacity disabled:opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to right, rgba(15,10,31,0.9), rgba(15,10,31,0))",
          }}
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute bottom-0 right-0 top-0 flex w-12 items-center justify-center opacity-0 transition-opacity disabled:opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to left, rgba(15,10,31,0.9), rgba(15,10,31,0))",
          }}
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
