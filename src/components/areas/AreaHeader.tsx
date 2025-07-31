interface Props {
  title: string;
}

export default function AreaHeader({ title }: Props) {
  return (
    <header
      role="banner"
      className="pt-20 px-4 text-center bg-gradient-to-b from-blue-900 to-transparent shadow-md max-w-7xl mx-auto"
    >
      <h1 className="text-5xl font-extrabold text-[#D4A75D] drop-shadow-md">
        {title}
      </h1>
    </header>
  );
}
