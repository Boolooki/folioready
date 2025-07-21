import { fetchJson } from "@/libs/fetch";
import { supabase } from "@/libs/supabaseClient";
import { LoginFormValues } from "@/libs/validationLoginForm";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

export function useLogin() {
  const [errorMessage, setErrorMessage] = useState("");

  const onSignInWithPassword = async (formData: LoginFormValues) => {
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
    return user;
  };

  const onFetchUserProfile = async (user: User | undefined) => {
    if(!user) {
      setErrorMessage("ผู้ใช้ยังไม่ได้เข้าสู่ระบบ");
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

      return profile
    } catch (err) {
      setErrorMessage("ไม่สามารถโหลดสถานะผู้ใช้ได้");
    }
  };

  return { onSignInWithPassword, onFetchUserProfile, errorMessage };
}
