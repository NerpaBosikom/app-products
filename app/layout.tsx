
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Products",
  description: "SPA products list with Next.js, Tailwind, Zustand"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-brand-50 to-white text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 w-full max-w-6xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
