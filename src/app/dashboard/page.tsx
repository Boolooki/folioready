'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabaseClient';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single();

      if (profile?.is_pro) {
        router.push('/dashboard/pro');
      } else {
        router.push('/dashboard/sites');
      }
    };

    checkUser();
  }, [router]);
  

  return <p className="text-center p-4">กำลังโหลดแดชบอร์ด...</p>;
}