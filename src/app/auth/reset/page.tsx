import { useState } from 'react';
import Link from 'next/link';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: เพิ่ม logic สำหรับส่งรีเซ็ตรหัสผ่าน เช่นเรียก API ส่งอีเมล reset
    console.log('Reset password email sent to:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {submitted ? (
          <p className="text-center">
            หากอีเมลนี้มีอยู่ในระบบ คุณจะได้รับลิงก์รีเซ็ตรหัสผ่านในไม่ช้า
          </p>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
            >
              Send Reset Link
            </button>
          </form>
        )}
        <p className="mt-4 text-center text-sm">
          Remembered your password?{' '}
          <Link href="/auth/login">
            <a className="text-blue-500 underline">Login</a>
          </Link>
        </p>
      </div>
    </div>
  );
}