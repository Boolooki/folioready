

export default function Landing() {
  return (
    <section className="relative">
      {/* Hero */}
      <div className="mx-auto max-w-5xl px-6 pt-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          Build a portfolio as unique as{" "}
          <span className="text-indigo-600">you</span>.
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
          Feed us your data, grab a coffee, and watch AI + Netlify do the magic.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Get started free
          </a>
          <a
            href="/pricing"
            className="inline-block px-6 py-3 text-lg font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            See pricing
          </a>
        </div>
      </div>
    </section>
  );
}
