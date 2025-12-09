"use client";

type Props = { children: React.ReactNode };

export default function ArticleBody({ children }: Props) {
  return (
    <div className="mt-10 prose prose-invert prose-sm md:prose-lg max-w-none text-white/90 leading-relaxed">
      {children}
    </div>
  );
}
