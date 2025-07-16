'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabaseClient';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('ออกจากระบบล้มเหลว:', error.message);
      } else {
        router.replace('/auth/login'); // ✅ ใช้ replace แทน push เพื่อไม่ให้ย้อนกลับ
      }
    };

    signOut();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-600 dark:text-gray-300">กำลังออกจากระบบ...</p>
    </div>
  );
}