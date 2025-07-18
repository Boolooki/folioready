"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabaseClient";
import Link from "next/link";
import { fetchJson } from "@/libs/fetch";

type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>();

  const onSubmit = async (formData: RegisterFormType) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name },
      },
    });
    if (error) {
      setErrorMessage(error.message);
      return;
    }

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
        setErrorMessage(result.error || "เกิดข้อผิดพลาดขณะสร้างโปรไฟล์");
        return;
      }
    }
    setIsRegisterSuccess(true);
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">สมัครสมาชิก</h2>
      {isRegisterSuccess ? (
        <h2 className="text-green-500 text-2xl font-bold text-center mb-6">
          สมัครสมาชิกสำเร็จ! โปรดยืนยันอีเมลของคุณ
        </h2>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="ชื่อ"
              disabled={isSubmitting}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="email"
              placeholder="อีเมล"
              disabled={isSubmitting}
              {...register("email", { required: "Name is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="password"
              placeholder="รหัสผ่าน"
              disabled={isSubmitting}
              {...register("password", { required: "Name is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
            disabled={isSubmitting}
          >
            สมัครสมาชิก
          </button>
        </form>
      )}

      <p className="text-center mt-4 text-sm">
        มีบัญชีแล้ว?{" "}
        <Link href="/auth/login" className="text-blue-500 underline">
          เข้าสู่ระบบ
        </Link>
      </p>
    </div>
  );
}
