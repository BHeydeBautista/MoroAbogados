import { motion } from "framer-motion";
import Image from "next/image";
import { Client } from "@/data/clients";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center bg-white/5 rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out"
    >
      {client.logo ? (
        <Image
          src={client.logo}
          alt={client.name}
          width={120}
          height={60}
          className="object-contain grayscale hover:grayscale-0 transition duration-300"
        />
      ) : (
        <div className="h-16 flex items-center justify-center text-gray-400 text-sm italic">
          Sin logo
        </div>
      )}
      <p className="mt-3 text-center text-sm font-semibold text-white">
        {client.name}
      </p>
    </motion.div>
  );
}
