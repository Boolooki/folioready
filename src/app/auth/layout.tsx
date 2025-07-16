// src/app/auth/layout.tsx
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
      {/* Card Container for Auth Forms */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow-md">
        {children}
      </div>
    </div>
  );
}