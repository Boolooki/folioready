"use client";

import { useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // สมัครสมาชิกผ่าน Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // เก็บชื่อใน user_metadata
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setSuccessMsg("");
      return;
    }

    const user = data?.user;
    if (!user) {
      setErrorMsg("ไม่สามารถสร้างบัญชีได้");
      return;
    }

    // Insert ลงตาราง custom profiles
    if (data?.user) {
      const { id, email } = data.user;

      const res = await fetch("/api/profiles/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          email,
          name,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.error || "เกิดข้อผิดพลาดขณะสร้างโปรไฟล์");
        return;
      }
    }

    setSuccessMsg("สมัครสมาชิกสำเร็จ! โปรดยืนยันอีเมลของคุณ");
    setErrorMsg("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">สมัครสมาชิก</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อ"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="อีเมล"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            สมัครสมาชิก
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          มีบัญชีแล้ว?{" "}
          <Link href="/auth/login" className="text-blue-500 underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
