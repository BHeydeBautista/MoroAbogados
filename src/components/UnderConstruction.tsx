'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UnderConstruction() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 text-center p-6">
      <div className="w-full max-w-5xl">
        <div className="relative w-full h-[60vh] mb-8">
          <Image
            src="/img/building.jpg"
            alt="Página en construcción"
            fill
            className="object-contain rounded-xl shadow-2xl"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          Esta página está en construcción 🚧
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Estamos trabajando para traerte esta funcionalidad muy pronto.
        </p>

        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#D4A75D] text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:bg-[#b9873a] transition-transform duration-200"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}
