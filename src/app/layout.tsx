import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalFix",
  description: "Reparaciones",
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
