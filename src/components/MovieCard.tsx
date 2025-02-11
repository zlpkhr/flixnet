import Image from "next/image"
import type { Movie } from "@/app/types/movie"
import { Star } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div className="relative aspect-[2/3] rounded-sm overflow-hidden cursor-pointer group">
          <Image
            src={movie.image_url || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="font-medium line-clamp-2">{movie.title}</h3>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm">{movie.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-80 bg-black/90 border-white/10 text-white">
        <div className="space-y-2">
          <h3 className="font-semibold">{movie.title}</h3>
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-300">{movie.description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

