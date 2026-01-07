"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type ReferenceData = {
  province: string;
  image: string;
  items: string[];
};

export default function ReferenceBlock({
  data,
  index,
}: {
  data: ReferenceData;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col md:flex-row gap-10 items-start"
    >
      <div className="md:w-1/3 flex justify-center">
        <div className="bg-white/5 p-4 rounded-xl shadow-lg">
          <Image
            src={data.image}
            alt={data.province}
            width={260}
            height={360}
            className="object-contain rounded-lg"
          />
        </div>
      </div>

      <div className="md:w-2/3">
        <h2 className="text-2xl font-serif text-[#D4A75D] mb-4">
          {data.province}
        </h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-200 text-sm leading-relaxed">
          {data.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
