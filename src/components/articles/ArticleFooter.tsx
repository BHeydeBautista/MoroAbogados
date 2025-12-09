"use client";

export default function ArticleFooter() {
  return (
    <footer className="mt-12 pt-6 border-t border-white/10 text-white/60 text-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <p>© {new Date().getFullYear()} Estudio Jurídico — Artículo doctrinario.</p>

        <div className="flex items-center gap-3 text-white/60 text-xs">
          <span className="hidden sm:inline">Compartir:</span>
          <a className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/8" href="#">Twitter</a>
          <a className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/8" href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
