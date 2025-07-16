export default function SitesPage() {
  // ตัวอย่าง: คุณอาจโหลดรายการเว็บไซต์จาก Supabase หรือ state ภายนอก
  const sites = [{
    id: 'site_01',
    name: 'My Portfolio Site',
    domain: 'portfolio.dev',
    created_at: '2024-05-01',
  },
  {
    id: 'site_02',
    name: 'Landing Page',
    domain: 'awesomepage.com',
    created_at: '2024-06-10',
  },
]; // ยังไม่มีข้อมูล

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">เว็บไซต์ของคุณ</h1>
      {sites.length === 0 ? (
        <div className="text-center text-gray-500 border border-dashed border-gray-300 p-12 rounded-lg">
          <p className="text-lg mb-2">คุณยังไม่มีเว็บไซต์ใด ๆ</p>
          <p>เริ่มสร้างเว็บไซต์ใหม่เพื่อแสดงผลงานของคุณ</p>
        </div>
      ) : (
        <ul>
          {sites.map((site) => (
            <li key={site.id}>{site.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}