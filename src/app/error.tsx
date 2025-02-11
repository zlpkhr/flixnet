'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-xl font-semibold text-red-500 mb-4">
        {error.message || 'Something went wrong!'}
      </h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
} 