// Servicio para obtener posts desde Instagram Graph API (server-side) con caché simple

type IGRaw = {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  media_type?: string;
  timestamp?: string;
};

let cache: { ts: number; data: IGRaw[] } | null = null;

export async function fetchInstagramMedia({
  userId,
  accessToken,
  limit = 9,
  ttl = 60, // segundos
}: {
  userId: string;
  accessToken: string;
  limit?: number;
  ttl?: number;
}) {
  const now = Date.now();
  if (cache && now - cache.ts < ttl * 1000) {
    return cache.data;
  }

  const fields = encodeURIComponent(
    "id,caption,media_url,thumbnail_url,permalink,media_type,timestamp"
  );
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Instagram API error: ${res.status} ${text}`);
  }
  const json = await res.json();
  const data: IGRaw[] = json?.data || [];
  cache = { ts: now, data };
  return data;
}