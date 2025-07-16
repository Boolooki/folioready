"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabaseClient";
import Link from "next/link";
import { fetchJson } from "@/libs/fetch"; // เพิ่มตรงนี้

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setErrorMsg("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("LOGIN RESULT:", { data, error });

    if (error) {
      setErrorMsg("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
      return;
    }

    const user = data?.user;
    if (user && !user.email_confirmed_at) {
      setErrorMsg("โปรดยืนยันอีเมลก่อนเข้าสู่ระบบ");
      setLoading(false);
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const profile = await fetchJson(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?select=is_pro&id=eq.${user.id}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${session?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      if (profile?.[0]?.is_pro) {
        router.push("/dashboard/pro");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("โหลดข้อมูล profile ไม่สำเร็จ:", err);
      setErrorMsg("ไม่สามารถโหลดสถานะผู้ใช้ได้");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="อีเมล"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          ยังไม่มีบัญชี?{" "}
          <Link href="/auth/register" className="text-blue-500 underline">
            สมัครสมาชิก
          </Link>
        </p>
        <p className="text-center mt-1 text-sm text-gray-500">
          หรือ{" "}
          <Link href="/auth/forgot" className="underline">
            ลืมรหัสผ่าน?
          </Link>
        </p>
      </div>
    </div>
  );
}
