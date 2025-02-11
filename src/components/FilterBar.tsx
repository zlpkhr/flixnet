const filters = [
  "A-Z",
  "Movies",
  "Series",
  "Originals",
  "Action",
  "Comedy",
  "Drama",
  "Fantasy & Sci-fi",
];

export default function FilterBar() {
  return (
    <div className="container mx-auto overflow-x-auto px-4 py-4">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className="whitespace-nowrap rounded-full bg-white/5 px-4 py-1.5 text-sm transition-colors hover:bg-white/10"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
