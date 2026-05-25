import { getProvince } from "@/data/referencesData";
import ProvincePageClient from "@/components/References/ProvincePageClient";
import { notFound } from "next/navigation";

export default async function SantaFePage() {
  const province = getProvince("santa-fe");
  if (!province) notFound();
  return <ProvincePageClient province={province} />;
}
