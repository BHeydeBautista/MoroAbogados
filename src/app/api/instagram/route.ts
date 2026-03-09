import { NextResponse } from "next/server";

export const runtime = "nodejs";

type IGPost = {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  media_type?: string;
  timestamp?: string;
};

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function normalizePosts(input: unknown): IGPost[] {
  const arr = Array.isArray(input) ? input : [];
  return arr
    .map((p: any) => {
      const id = String(p?.id ?? "");
      const media_url = String(p?.media_url ?? "");
      const permalink = String(p?.permalink ?? "");
      if (!id || !media_url || !permalink) return null;
      const post: IGPost = {
        id,
        media_url,
        permalink,
      };
      if (p?.thumbnail_url) post.thumbnail_url = String(p.thumbnail_url);
      if (p?.caption) post.caption = String(p.caption);
      if (p?.media_type) post.media_type = String(p.media_type);
      if (p?.timestamp) post.timestamp = String(p.timestamp);
      return post;
    })
    .filter(Boolean) as IGPost[];
}

async function fetchFromBackend(baseUrl: string): Promise<IGPost[]> {
  const url = `${baseUrl.replace(/\/$/, "")}/instagram`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Backend /instagram respondió ${res.status}`);
  }
  const json = await res.json();
  const maybeArray = json?.data?.data ?? json?.data ?? json?.posts ?? json;
  return normalizePosts(maybeArray);
}

async function fetchFromInstagramGraph(): Promise<IGPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!accessToken || !userId) return [];

  const params = new URLSearchParams({
    fields:
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    access_token: accessToken,
    limit: "18",
  });

  const url = `https://graph.facebook.com/v19.0/${userId}/media?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Graph API respondió ${res.status}`);
  }

  const json = await res.json();
  return normalizePosts(json?.data);
}

export async function GET() {
  try {
    const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (baseUrl) {
      const posts = await fetchFromBackend(baseUrl);
      return NextResponse.json({ data: posts }, { status: 200 });
    }

    const posts = await fetchFromInstagramGraph();
    if (posts.length) {
      return NextResponse.json({ data: posts }, { status: 200 });
    }

    return jsonError(
      "Falta configurar API_URL o credenciales de Instagram (INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID).",
      501
    );
  } catch (err: any) {
    return jsonError(err?.message || "Error al obtener datos de Instagram", 502);
  }
}
