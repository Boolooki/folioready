// "use client";

import RegisterForm from "./RegisterForm";

// import { useState } from "react";
// import { supabase } from "@/libs/supabaseClient";
// import Link from "next/link";

export default function RegisterPage() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [errorMsg, setErrorMsg] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // สมัครสมาชิกผ่าน Supabase Auth
  //   const { data, error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       data: { name }, // เก็บชื่อใน user_metadata
  //     },
  //   });

  //   if (error) {
  //     setErrorMsg(error.message);
  //     setSuccessMsg("");
  //     return;
  //   }

  //   const user = data?.user;
  //   if (!user) {
  //     setErrorMsg("ไม่สามารถสร้างบัญชีได้");
  //     return;
  //   }

  //   // Insert ลงตาราง custom profiles
  //   if (data?.user) {
  //     const { id, email } = data.user;

  //     const res = await fetch("/api/profiles/insert", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         id,
  //         email,
  //         name,
  //       }),
  //     });

  //     const result = await res.json();

  //     if (!res.ok) {
  //       setErrorMsg(result.error || "เกิดข้อผิดพลาดขณะสร้างโปรไฟล์");
  //       return;
  //     }
  //   }

  //   setSuccessMsg("สมัครสมาชิกสำเร็จ! โปรดยืนยันอีเมลของคุณ");
  //   setErrorMsg("");
  //   setName("");
  //   setEmail("");
  //   setPassword("");
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <RegisterForm />
    </div>
  );
}
