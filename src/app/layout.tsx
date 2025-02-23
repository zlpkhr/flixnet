import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Background from "@/components/layout/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlixNet",
  description: "A modern movie streaming platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
