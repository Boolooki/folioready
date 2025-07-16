export default function CtaBanner() {
  return (
    <section className="py-16 px-6 bg-blue-600 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">พร้อมสร้าง portfolio แล้วหรือยัง?</h2>
      <p className="mb-6">เริ่มต้นใช้งานฟรีวันนี้ หรืออัปเกรดเป็น Pro เมื่อพร้อม!</p>
      <a href="/auth/register" className="bg-white text-blue-600 font-bold py-2 px-6 rounded hover:bg-gray-100">
        เริ่มใช้งานฟรี
      </a>
    </section>
  );
}