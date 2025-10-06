/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { fetchInstagramMedia } from "@/services/instagramService";

export async function GET() {
  const USER_ID = process.env.INSTAGRAM_USER_ID;
  const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const TTL = Number(process.env.INSTAGRAM_CACHE_TTL || "60");

  if (!USER_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Falta INSTAGRAM_USER_ID o INSTAGRAM_ACCESS_TOKEN en .env" },
      { status: 500 }
    );
  }

  try {
    const data = await fetchInstagramMedia({
      userId: USER_ID,
      accessToken: ACCESS_TOKEN,
      limit: 9,
      ttl: TTL,
    });

    return NextResponse.json({ data }, { status: 200, headers: { "Cache-Control": `s-maxage=${TTL}` } });
  } catch (err: any) {
    console.error("instagram route error:", err);
    return NextResponse.json({ error: "Error al obtener publicaciones" }, { status: 500 });
  }
}