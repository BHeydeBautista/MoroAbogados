import { getProvince } from "@/data/referencesData";
import ProvincePageClient from "@/components/References/ProvincePageClient";
import { notFound } from "next/navigation";

export default async function BuenosAiresPage() {
  const province = getProvince("buenos-aires");
  if (!province) notFound();
  return <ProvincePageClient province={province} />;
}
