import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import Providers from "./providers";

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
