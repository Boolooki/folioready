import Navbar from "@/components/Navbar";
import './globals.css';

// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Folio-Ready</title>
        <meta name="description" content="Hyper-custom Portfolio Generator (AI-Powered)" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}