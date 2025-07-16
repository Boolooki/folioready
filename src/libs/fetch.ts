export const fetchJson = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, {
    method: 'GET', // ✅ อยู่ที่นี่ ไม่ใช่ใน headers
    ...init,
    headers: {
      Accept: 'application/json', // 👈 สำคัญที่สุด
      'Content-Type': 'application/json',
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      ...(init?.headers || {}),
      
    },
    
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorText}`);
  }

  return response.json();
};