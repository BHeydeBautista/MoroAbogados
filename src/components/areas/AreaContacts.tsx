// components/areas/AreaContacts.tsx
const contacts = [
  {
    name: "Santiago Carregal",
    role: "Socio",
    image: "/img/lawyer1.jpg",
  },
  {
    name: "Gabriel Matarasso",
    role: "Socio",
    image: "/img/lawyer1.jpg",
  },
  {
    name: "Juan M. Diehl Moreno",
    role: "Socio",
    image: "/img/lawyer1.jpg",
  },
  {
    name: "Pablo J. Gayol",
    role: "Socio",
    image: "/img/lawyer1.jpg",
  },
];

export default function AreaContacts() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contactos</h2>
      <ul className="space-y-4">
        {contacts.map(({ name, role, image }) => (
          <li key={name} className="flex items-center space-x-4">
            <img src={image} alt={name} className="w-16 h-16 object-cover rounded" />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
