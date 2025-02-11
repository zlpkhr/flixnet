import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { MovieProvider } from "@/context/MovieContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#0f0a1f] text-white antialiased`}
      >
        <MovieProvider>{children}</MovieProvider>
      </body>
    </html>
  );
}
