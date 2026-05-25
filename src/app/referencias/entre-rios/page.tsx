import { getProvince } from "@/data/referencesData";
import ProvincePageClient from "@/components/References/ProvincePageClient";
import { notFound } from "next/navigation";

export default async function EntreRiosPage() {
  const province = getProvince("entre-rios");
  if (!province) notFound();
  return <ProvincePageClient province={province} />;
}
