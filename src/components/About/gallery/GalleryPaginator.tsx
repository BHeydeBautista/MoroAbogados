"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryPaginatorProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
}

const GalleryPaginator: React.FC<GalleryPaginatorProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageChange,
}) => {
  // Genera números de página a mostrar (máximo 5)
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start < 4) {
      if (start === 1) end = Math.min(5, totalPages);
      else start = Math.max(1, end - 4);
    }

    if (start > 1) pages.push(1, "...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) pages.push("...", totalPages);

    return pages;
  };

  return (
    <div className="py-12">
      <div className="flex justify-center items-center gap-3 flex-wrap">
        {/* Botón Anterior */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === 1}
          onClick={onPrevPage}
          className={`p-2 rounded-lg transition-all ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-[#0F1C2E] hover:bg-[#D4A75D]/10 border border-[#D4A75D]/20 hover:border-[#D4A75D]/40"
          }`}
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Números de página */}
        {getPageNumbers().map((page, idx) => (
          <div key={idx}>
            {page === "..." ? (
              <span className="px-2 text-gray-400">...</span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-[#D4A75D] text-white shadow-lg"
                    : "text-[#0F1C2E] hover:bg-[#D4A75D]/10 border border-[#D4A75D]/20 hover:border-[#D4A75D]/40"
                }`}
              >
                {page}
              </motion.button>
            )}
          </div>
        ))}

        {/* Botón Siguiente */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === totalPages}
          onClick={onNextPage}
          className={`p-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-[#0F1C2E] hover:bg-[#D4A75D]/10 border border-[#D4A75D]/20 hover:border-[#D4A75D]/40"
          }`}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Info de página */}
      <div className="text-center mt-6 text-sm text-gray-600">
        Página <span className="font-semibold text-[#0F1C2E]">{currentPage}</span> de{" "}
        <span className="font-semibold text-[#0F1C2E]">{totalPages}</span>
      </div>
    </div>
  );
};

export default GalleryPaginator;
