'use client';

import { useSearch } from '@/contexts/SearchContext';

const QUICK_FILTERS = [
  { label: 'Action', query: 'action' },
  { label: 'Drama', query: 'drama' },
  { label: 'Comedy', query: 'comedy' },
  { label: 'Sci-Fi', query: 'sci-fi' },
  { label: 'Horror', query: 'horror' },
  { label: 'Romance', query: 'romance' },
];

export default function FilterBar() {
  const { query, setSearch } = useSearch();

  const handleFilterClick = (filterQuery: string) => {
    setSearch(query === filterQuery ? '' : filterQuery);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-wrap gap-2">
        {QUICK_FILTERS.map(({ label, query: filterQuery }) => (
          <button
            key={filterQuery}
            onClick={() => handleFilterClick(filterQuery)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${query === filterQuery
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
