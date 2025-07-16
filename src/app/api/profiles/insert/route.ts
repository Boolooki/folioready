import { supabase } from '@/libs/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { id, email, name } = body;

  if (!id || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await supabase.from('profiles').insert([
    {
      id,
      name,
      email,
      is_pro: false,
    },
  ]);

  if (error) {
    console.error('[INSERT_PROFILE_ERROR]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Profile created' }, { status: 200 });
}