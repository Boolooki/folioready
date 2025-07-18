import RegisterForm from "./RegisterForm";

export const metadata = {
  title: 'Register',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <RegisterForm />
    </div>
  );
}
