import { Metadata } from "next";
import SearchHeader from "@/components/SearchHeader";
import FilterBar from "@/components/FilterBar";
import MovieGrid from "@/components/MovieGrid";

export const metadata: Metadata = {
  title: "FlixNet - Movie Discovery",
  description: "Discover and explore your favorite movies",
};

// Force dynamic rendering to ensure fresh data
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0f0a1f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-800/5 to-transparent" />
      </div>
      <SearchHeader />
      <FilterBar />
      <MovieGrid />
    </main>
  );
}
