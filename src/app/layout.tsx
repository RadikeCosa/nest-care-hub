// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

export const metadata: Metadata = {
  title: "Nest Care Hub",
  description: "A platform with utilities for home healthcare providers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen bg-gray-50 text-gray-900">
        <Header />

        <main className="flex-1 container mx-auto px-4">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
