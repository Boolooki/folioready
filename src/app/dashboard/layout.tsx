// src/app/dashboard/layout.tsx
import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="mt-16 flex flex-1">
        {/* Sidebar สำหรับนำทางใน dashboard */}
        <Sidebar />
        
        {/* พื้นที่เนื้อหาหลัก */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}