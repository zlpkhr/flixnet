import React from "react";
import GridLayout from "./GridLayout";

interface EmptyStateProps {
  query?: string;
}

export default function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="relative">
      <div className="opacity-30">
        <GridLayout>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-sm bg-purple-900/20" />
          ))}
        </GridLayout>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-lg bg-black/50 px-4 py-8 text-center backdrop-blur-sm">
          <h3 className="mb-2 text-xl font-semibold text-white">
            {query ? `No movies found for "${query}"` : "No movies available"}
          </h3>
          <p className="text-white/70">
            {query
              ? "Try adjusting your search or filters"
              : "Please check back later for new movies"}
          </p>
        </div>
      </div>
    </div>
  );
}
