"use client";

type Props = { children: React.ReactNode };

export default function ArticleBody({ children }: Props) {
  return (
    <div className="mt-10 prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed">
      <div className="first-letter:text-6xl first-letter:font-extrabold first-letter:text-[#d4a75d] first-letter:mr-3 first-letter:float-left">
        {children}
      </div>
    </div>
  );
}
