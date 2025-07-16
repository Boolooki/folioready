export default function HeroSection() {
  return (
    <section className="text-center py-20 px-6 bg-white dark:bg-gray-900">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        สร้างพอร์ตโฟลิโอที่โดดเด่นภายในไม่กี่นาที
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
        Folio-Ready ช่วยให้คุณสร้างเว็บไซต์มืออาชีพโดยไม่ต้องเขียนโค้ด พร้อมฟีเจอร์ครบครัน
      </p>
      <div className="space-x-4">
        <a href="/auth/register" className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800">
          เริ่มต้นเลย
        </a>
        <a href="#pricing" className="text-blue-600 dark:text-blue-400 underline">ดูราคา</a>
      </div>
    </section>
  );
}