import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMAC Group | Premium Fresh Fruits & Vegetables Exporter",
  description: "AMAC Group is a premier international grower, packager, and exporter of world-class fresh fruits and vegetables.",
  keywords: ["AMAC Group", "fresh fruits", "fresh vegetables", "produce exporter", "agriculture", "cold chain export"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
