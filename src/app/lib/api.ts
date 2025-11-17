export async function getInstagramPosts() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/instagram`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener datos de Instagram");
  }

  const json = await res.json();
  return json.data;
}
