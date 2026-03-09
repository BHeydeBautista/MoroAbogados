export async function getInstagramPosts() {
  const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  const url = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}/instagram`
    : "http://localhost:3000/api/instagram";

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener datos de Instagram");
  }

  const json = await res.json();
  return json.data;
}
