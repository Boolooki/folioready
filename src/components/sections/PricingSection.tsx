const plans = [
  {
    name: 'Free',
    price: '0฿',
    features: ['ใช้ template ได้บางส่วน', 'โดเมน folio-ready.io'],
  },
  {
    name: 'Pro',
    price: '299฿ / เดือน',
    features: ['ใช้ template ทั้งหมด', 'เชื่อมต่อโดเมนตัวเอง', 'ปลดล็อคฟีเจอร์ Premium'],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-6 bg-white dark:bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-10">แพ็กเกจราคา</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((p, i) => (
          <div key={i} className="border rounded p-6 shadow dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
            <p className="text-3xl font-bold mb-4">{p.price}</p>
            <ul className="text-left mb-6 space-y-2">
              {p.features.map((f, j) => (
                <li key={j}>✓ {f}</li>
              ))}
            </ul>
            <a
              href={p.name === 'Pro' ? '/checkout' : '/auth/register'}
              className="block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {p.name === 'Pro' ? 'สมัคร Pro' : 'เริ่มใช้ฟรี'}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}