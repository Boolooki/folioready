const features = [
  { title: 'ลากวางได้', description: 'ออกแบบ portfolio ได้อย่างอิสระไม่ซ้ำใคร' },
  { title: 'รองรับ Dark mode', description: 'เพื่อนักออกแบบสายเท่ทุกคน' },
  { title: 'เชื่อมต่อโดเมน', description: 'ใช้ชื่อเว็บของคุณเองได้เลย' },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-10">ฟีเจอร์เด่น</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-900 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}