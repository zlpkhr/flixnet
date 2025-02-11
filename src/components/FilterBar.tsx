const filters = ["A-Z", "Movies", "Series", "Originals", "Action", "Comedy", "Drama", "Fantasy & Sci-fi"]

export default function FilterBar() {
  return (
    <div className="container mx-auto px-4 py-4 overflow-x-auto">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className="px-4 py-1.5 text-sm rounded-full bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}

