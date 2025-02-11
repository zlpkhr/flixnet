import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies..."
            className="w-full pl-9 bg-white/5 border-white/10 focus-visible:ring-white/20"
          />
        </div>
      </div>
    </header>
  )
}

