const testimonials = [
  {
    name: 'นักออกแบบอิสระ',
    quote: 'Folio-Ready ช่วยให้ฉันมีเว็บ portfolio ที่ดูโปรแบบง่าย ๆ',
  },
  {
    name: 'นักพัฒนา',
    quote: 'ระบบ premium plan ชัดเจนและต่อยอดได้ง่ายมาก',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-10">เสียงจากผู้ใช้</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="border-l-4 border-blue-500 pl-4 text-gray-700 dark:text-gray-300">
            “{t.quote}”
            <footer className="mt-2 text-sm text-gray-500">— {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}