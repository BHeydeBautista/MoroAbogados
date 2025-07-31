interface Props {
  left: React.ReactNode;
  right?: React.ReactNode;
}

export default function AreaLayout({ left, right }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="md:col-span-2">{left}</div>
      {right && (
        <aside className="space-y-4 p-4 bg-white rounded shadow-sm">{right}</aside>
      )}
    </div>
  );
}
