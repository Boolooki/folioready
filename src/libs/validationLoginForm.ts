import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;