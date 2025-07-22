"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginFormSchema, LoginFormValues } from "@/libs/validationLoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useLogin";

type props = { defaultValues: LoginFormValues };

export default function LoginForm({ defaultValues }: props) {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { onSignInWithPassword, onFetchUserProfile, errorMessage } = useLogin();

  const onSubmit = async (formData: LoginFormValues) => {
    const user = await onSignInWithPassword(formData);

    const profile = await onFetchUserProfile(user);
    
    if (profile?.[0]?.is_pro) {
      router.push("/dashboard/pro");
    } else {
      router.push("/dashboard");
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

