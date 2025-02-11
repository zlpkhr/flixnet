import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"

export default function HeroSection() {
  return (
    <div
      className="relative h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent">
        <div className="container mx-auto h-full flex flex-col justify-center px-4">
          <h1 className="text-5xl font-bold mb-4">Movie Title</h1>
          <p className="text-lg mb-6 max-w-xl">
            A brief description of the movie that captures the essence of its plot and entices viewers to watch it.
          </p>
          <div className="flex space-x-4">
            <Button className="flex items-center">
              <Play className="mr-2 h-5 w-5" /> Play
            </Button>
            <Button variant="outline" className="flex items-center">
              <Info className="mr-2 h-5 w-5" /> More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

