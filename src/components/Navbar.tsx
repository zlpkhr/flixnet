import Link from "next/link";
import { Search, Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-red-600">
            MOVIEFLIX
          </Link>
          <Link href="/" className="text-sm">
            Home
          </Link>
          <Link href="/tv-shows" className="text-sm">
            TV Shows
          </Link>
          <Link href="/movies" className="text-sm">
            Movies
          </Link>
          <Link href="/new" className="text-sm">
            New & Popular
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="h-5 w-5" />
          <Bell className="h-5 w-5" />
          <User className="h-5 w-5" />
        </div>
      </div>
    </nav>
  );
}
