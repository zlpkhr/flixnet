import Link from "next/link";
import { Suspense } from "react";
import SearchHeader from "@/components/SearchHeader";
import FilterBar from "@/components/FilterBar";

function LoadingFallback() {
  return <div className="h-16 bg-background/80" />;
}

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0f0a1f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-800/5 to-transparent" />
      </div>
      <Suspense fallback={<LoadingFallback />}>
        <SearchHeader />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <FilterBar />
      </Suspense>
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4 opacity-30 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-sm bg-purple-900/20"
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg bg-black/50 px-4 py-8 text-center backdrop-blur-sm">
              <h2 className="mb-2 text-xl font-semibold text-white">
                Page Not Found
              </h2>
              <p className="mb-4 text-white/70">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>
              <Link
                href="/"
                className="inline-block rounded-full bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
