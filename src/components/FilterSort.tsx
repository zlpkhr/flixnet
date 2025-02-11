import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterSortProps {
  onSort: (key: "year" | "rating") => void
  onFilter: (genre: string) => void
  sortKey: "year" | "rating"
  filterGenre: string
}

export default function FilterSort({ onSort, onFilter, sortKey, filterGenre }: FilterSortProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Button variant={sortKey === "year" ? "default" : "outline"} onClick={() => onSort("year")}>
          Year
        </Button>
        <Button variant={sortKey === "rating" ? "default" : "outline"} onClick={() => onSort("rating")}>
          Rating
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Filter by genre:</span>
        <Select onValueChange={onFilter} value={filterGenre}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="Action">Action</SelectItem>
            <SelectItem value="Crime">Crime</SelectItem>
            <SelectItem value="Drama">Drama</SelectItem>
            <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
            <SelectItem value="Thriller">Thriller</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

