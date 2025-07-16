import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';

export const runtime = 'nodejs';

// 🎯 สร้าง Supabase Server Client ด้วย Service Role (ห้ามใช้ใน client!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

// 🧠 สร้าง OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json();
    console.log('🔑 user_id:', user_id);

    // เช็ก user_id ตรงๆ
    if (!user_id || typeof user_id !== 'string') {
      return NextResponse.json({ error: 'user_id ไม่ถูกต้อง' }, { status: 400 });
    }

    // 🔎 ดึงข้อมูล portfolio input ของผู้ใช้
    const { data, error } = await supabase
      .from('portfolio_inputs')
      .select('*')
      .eq('user_id', user_id)
      .limit(1);

    if (error) {
      console.error('🛑 Supabase error:', error);
      return NextResponse.json({ error: 'Supabase query ล้มเหลว' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'ไม่พบข้อมูลของผู้ใช้' }, { status: 404 });
    }

    // Define a type for project
    type Project = {
      title: string;
      description: string;
    };

    const input = data[0] as typeof data[0] & { projects?: Project[] };
    console.log('🧾 input:', input);

    // 🧠 สร้าง Prompt ให้ AI
    const prompt = `
คุณกำลังช่วยสร้างเว็บไซต์ Portfolio ด้วย HTML markup

ข้อมูลผู้ใช้:
- ชื่อ: ${input.name}
- เกี่ยวกับฉัน: ${input.bio}
- ทักษะ: ${input.skills?.join(', ') ?? 'ไม่มี'}
- ลิงก์: ${input.links?.join(', ') ?? 'ไม่มี'}

โปรเจกต์:
${(input.projects as Project[])
  ?.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`)
  .join('\n') ?? 'ไม่มีโปรเจกต์'}

กรุณาสร้าง HTML หน้าเว็บ Portfolio แบบ responsive โดยมี section: Hero, About, Skills, Projects, Contact
`;

    // 🚀 เรียก AI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'คุณเป็นผู้ช่วยสร้างเว็บไซต์ Portfolio ด้วย HTML แบบสวยงาม' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const aiContent = completion.choices[0]?.message?.content;

    if (!aiContent) {
      return NextResponse.json({ error: 'AI ไม่คืนค่า' }, { status: 500 });
    }

    return NextResponse.json({ content: aiContent });
  } catch (err) {
    console.error('💥 Unexpected error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายใน' }, { status: 500 });
  }
}