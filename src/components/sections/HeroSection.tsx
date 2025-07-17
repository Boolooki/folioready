export default function HeroSection() {
  return (
    <section className="bg-[url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXhocnl0YTR3ZWx5N3c2ZXBsMXZhajRwNGlpOHd5emM5OXJ1dTZmayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/doXBzUFJRxpaUbuaqz/giphy.gif')] bg-cover text-center py-20 px-6 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-4">
        instantly impressive in a few clicks
      </h1>
      <p className="text-[lightgrey] dark:text-gray-300 mb-8 max-w-xl mx-auto">
        Folio-Ready helps you create a stunning portfolio in minutes, no coding required.
      </p>
      <div className="space-x-4">
        <a href="/auth/register" className="bg-white text-black py-2 px-6 rounded hover:bg-[lightgrey] transition-colors duration-200">
          Get Started
        </a>
        <a href="#pricing" className="text-white dark:text-blue-400 underline">View Pricing</a>
      </div>
    </section>
  );
}