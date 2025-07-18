"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabaseClient";
import Link from "next/link";
import { fetchJson } from "@/libs/fetch";

type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>();

  const onSubmit = async (formData: LoginFormType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const user = data?.user;
    if (user && !user.email_confirmed_at) {
      setErrorMessage("โปรดยืนยันอีเมลก่อนเข้าสู่ระบบ");
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
      setErrorMessage("ไม่สามารถโหลดสถานะผู้ใช้ได้");
    }

    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">เข้าสู่ระบบ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            className="w-full border rounded p-2"
            type="email"
            placeholder="อีเมล"
            disabled={isSubmitting}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            className="w-full border rounded p-2"
            type="password"
            placeholder="รหัสผ่าน"
            disabled={isSubmitting}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
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
  );
}
