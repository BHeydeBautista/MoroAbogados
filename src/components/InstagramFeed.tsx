// components/InstagramFeed.tsx
const mockedPosts = [
  {
    id: "1",
    media_url: "/mock/1.png",
    caption: "🧑‍⚖️✨ ¡Este viernes participamos de una jornada imperdible!",
    permalink: "https://www.instagram.com/p/Cmock1/",
  },
  {
    id: "2",
    media_url: "/mock/2.png",
    caption: "🏗️ ¿Qué pasa si se cae una obra?",
    permalink: "https://www.instagram.com/p/Cmock2/",
  },
  {
    id: "3",
    media_url: "/mock/3.png",
    caption: "🔒 ¿Sabías que tu imagen es un derecho protegido por la ley?",
    permalink: "https://www.instagram.com/p/Cmock3/",
  },
];

const InstagramFeed = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-24 text-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-serif font-semibold text-[#0F1C2E] mb-4">
          Últimas publicaciones
        </h2>
        
        <div className="w-14 h-1 bg-[#D4A75D] mx-auto my-6 rounded" />

        <p className="text-base lg:text-lg text-gray/70 max-w-3xl mx-auto mb-14 leading-relaxed">
          Un vistazo a nuestra presencia institucional y actualidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockedPosts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-lg border border-[#D4A75D] hover:scale-[1.02] transition-all"
            >
              <img
                src={post.media_url}
                alt={post.caption}
                className="w-full h-[300px] object-cover"
              />
              <div className="px-4 py-2 bg-white text-sm  text-gray/70 group-hover:text-black transition">
                {post.caption}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
