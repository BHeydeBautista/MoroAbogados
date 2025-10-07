import React from "react";
import { motion } from "framer-motion";

export type IGPost = {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
  media_type?: string;
  timestamp?: string;
};

type Props = {
  posts: IGPost[];
  loading: boolean;
  error: string | null;
};

export default function InstagramPosts({ posts, loading, error }: Props) {
  return (
    <motion.div
      key="ig"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28 }}
    >
      <div className="mb-4 flex justify-center">
        <div className="w-14 h-1 bg-[#D4A75D] rounded" />
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-500">Cargando...</div>
      )}

      {error && (
        <div className="text-center text-sm text-red-600 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-lg border border-[#D4A75D]/40 hover:scale-[1.02] transition-all bg-white"
          >
            <div className="w-full h-[280px] bg-gray-100 overflow-hidden">
              <img
                src={post.media_url}
                alt={post.caption || "Instagram post"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-4 py-3 text-sm text-gray-700 group-hover:text-black transition">
              {post.caption ? post.caption : "—"}
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
}