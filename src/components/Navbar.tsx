"use client";

import Link from "next/link";
import Image from "next/image";
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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow flex items-center justify-between px-4 md:px-8">
      <div className="w-[20vw] h-[7vw] overflow-hidden rounded-md">
      <Link href="/" className="text-lg font-bold">
          <Image
            src="/folioready.png"
            alt="Folio-Ready"
            width={150}
            height={50}
          />
      </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="text-gray-700 hover:text-gray-900 hover:bg-[lightgray] transition-colors duration-300 rounded-md"
        >
          Pricing
        </Link>
        <Link
          href="/about"
          className="text-gray-700 hover:text-gray-900 hover:bg-[lightgray] transition-colors duration-300 rounded-md"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-700 hover:text-gray-900 hover:bg-[lightgray] transition-colors duration-300 rounded-md"
        >
          Contact
        </Link>
      </div>
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
              href="/auth/login"
              className="bg-[#F4F4F5] rounded-lg p-3 hover:bg-[#E4E4E7] transition-colors duration-300"
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="bg-[blue] text-white rounded-lg p-3"
            >
              Create Folio Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
