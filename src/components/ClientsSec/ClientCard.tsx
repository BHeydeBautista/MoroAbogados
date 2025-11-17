import { motion } from "framer-motion";
import Image from "next/image";
import { Client } from "@/data/clients";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      tabIndex={0}
      className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl focus-within:shadow-xl transition-all ring-0 focus:outline-none focus:ring-2 focus:ring-[#D4A75D]/70"
    >
      {client.logo ? (
        <div className="w-full flex items-center justify-center p-3 rounded-md bg-white/10 backdrop-blur-sm">
          <Image
            src={client.logo}
            alt={client.name}
            width={140}
            height={70}
            className="object-contain transition-transform duration-300 hover:scale-105 hover:brightness-110"
          />
        </div>
      ) : (
        <div className="h-16 flex items-center justify-center text-gray-400 text-sm italic">
          Sin logo
        </div>
      )}

      <p className="mt-3 text-center text-sm font-medium text-white/90">
        {client.name}
      </p>
    </motion.div>
  );
}
