// "use client";

import LoginForm from "./LoginForm";

export const metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <LoginForm />
    </div>
  );
}
