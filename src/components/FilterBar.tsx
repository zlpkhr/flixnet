'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const QUICK_FILTERS = [
  { label: 'Action', query: 'action' },
  { label: 'Drama', query: 'drama' },
  { label: 'Comedy', query: 'comedy' },
  { label: 'Sci-Fi', query: 'sci-fi' },
  { label: 'Horror', query: 'horror' },
  { label: 'Romance', query: 'romance' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || '';

  const handleFilterClick = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', currentQuery === query ? '' : query);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-wrap gap-2">
        {QUICK_FILTERS.map(({ label, query }) => (
          <button
            key={query}
            onClick={() => handleFilterClick(query)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${currentQuery === query
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
