'use client';

import ProfileForm from '@/components/editor/ProfileForm';

export default function EditorPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 pt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">ตั้งค่าข้อมูล Portfolio</h1>
        <ProfileForm />
      </div>
    </main>
  );
}