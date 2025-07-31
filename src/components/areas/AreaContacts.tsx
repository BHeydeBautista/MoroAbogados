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
    <section>
      <h2 className="text-xl font-semibold mb-6">Contactos</h2>
      <ul className="space-y-6">
        {contacts.map(({ name, role, image }) => (
          <li key={name} className="flex items-center space-x-5">
            <img
              src={image}
              alt={`${name} - ${role}`}
              className="w-16 h-16 object-cover rounded-full"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
