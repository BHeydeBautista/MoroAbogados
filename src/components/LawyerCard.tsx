
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lawyer } from "@/data/lawyerData";

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border-2 border-[#D4A75D] overflow-hidden"
    >
      <Link href={`/abogados/${lawyer.slug}`} className="block">
        <div className="relative w-full h-64">
          <Image
            src={lawyer.image}
            alt={lawyer.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-serif font-bold text-[#0F1C2E] mb-2">
            {lawyer.name}
          </h3>
          <p className="text-sm font-sans text-[#444] mb-3">
            {lawyer.title}
          </p>
          <p className="text-sm text-[#777] line-clamp-3 mb-4">
            {lawyer.bio}
          </p>
          <span className="inline-block px-4 py-2 text-sm bg-[#D4A75D] text-white font-semibold rounded-full hover:bg-[#c0953f] transition">
            Ver perfil completo
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default LawyerCard;
