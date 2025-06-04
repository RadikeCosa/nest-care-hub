import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nest Care Hub",
  description: "A platform with utilities for home healthcare providers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
