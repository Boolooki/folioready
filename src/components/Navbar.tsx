"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabaseClient";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // โหลด session ครั้งแรก
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkSession();

    // subscribe auth state change (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[blue] shadow flex items-center justify-between px-4 md:px-8">
      <Link href="/" className="text-lg font-bold">
        Folio-Ready
      </Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
          <Link
              href="/notifications"
              className="bg-[red] rounded-lg p-2 hover:bg-[grey]"
            >
              Notifications
            </Link>
            <Link
              href="/profile"
              className="bg-[black] rounded-lg p-2 hover:bg-[grey]"
            >
              Profile
            </Link>
            <Link
              href="/dashboard"
              className="bg-[black] rounded-lg p-2 hover:bg-[grey]"
            >
              Dashboard
            </Link>
            <Link
              href="/auth/logout"
              className="bg-[red] rounded-lg p-2 hover:bg-[grey]"
            >
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/register"
              className="bg-[black] rounded-lg p-2 hover:bg-[grey]"
            >
              register
            </Link>
            <Link
              href="/auth/login"
              className="bg-[green] rounded-lg p-2 hover:bg-[grey]"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
