// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ThemeScript from "@/components/ThemeScript";

export const metadata: Metadata = {
  title: "RideCanvas - India's AI-Powered Car Customization Ecosystem",
  description: "Design your dream car, see realistic AI-generated 3D previews, compare quotes from verified customization studios, finance builds, and book expert modification mechanics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased min-h-screen">
        <div className="flex">
          {/* Persistent Sidebar Navigation */}
          <Sidebar />

          {/* Main Workspace Frame */}
          <div className="flex-grow min-h-screen flex flex-col md:pl-[260px]">
            {/* Sticky Header Navbar */}
            <Header />

            {/* Dynamic app page contents container */}
            <main className="flex-grow p-4 md:p-8 flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
