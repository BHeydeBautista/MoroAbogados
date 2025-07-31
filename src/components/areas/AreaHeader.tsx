interface Props {
  title: string;
}

export default function AreaHeader({ title }: Props) {
  return (
    <header
      role="banner"
      className="max-w-7xl mx-auto px-6 py-12 mt-8 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 shadow-lg"
    >
      <h1 className="text-center text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-lg">
        {title}
      </h1>
      <p className="mt-4 text-center text-lg font-medium text-gray-700 max-w-3xl mx-auto">
        Especialistas en derecho societario con soluciones jurídicas a medida para cada cliente.
      </p>
    </header>
  );
}
