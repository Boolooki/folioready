// src/components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow p-4">
      <nav className="flex flex-col space-y-3">
        <p className="bg-white text-[black]">Menu</p>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/sites">Sites</Link>
        <Link href="/dashboard/settings">Settings</Link>
        <Link href="/editor">Editor Portfolio</Link>
      </nav>
    </aside>
  );
}
