// GET /api/config
// 빌드시 호출해서 캐시함
export const dynamic = 'force-static';

export async function GET(){
  const res = await fetch('https://fesp-api.koyeb.app/market/config', {
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': 'openmarket',
    }
  });
  const data = await res.json();
  return Response.json({ timestamp: new Date(), ...data });
}