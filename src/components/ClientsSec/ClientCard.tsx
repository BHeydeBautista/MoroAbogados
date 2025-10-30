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
      tabIndex={0} // permite focus para keyboard users
      className="flex flex-col items-center bg-white/5/5 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl focus-within:shadow-xl transition-all duration-300 ease-in-out ring-0 focus:outline-none focus:ring-2 focus:ring-yellow-300"
    >
      {client.logo ? (
        <Image
          src={client.logo}
          alt={client.name}
          width={120}
          height={60}
          className="object-contain transition-transform duration-300 transform will-change-transform hover:scale-105 hover:-translate-y-1 hover:brightness-105 hover:saturate-110 hover:drop-shadow-lg focus:scale-105"
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
