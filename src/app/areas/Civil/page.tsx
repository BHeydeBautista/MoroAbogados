import AreaPageTemplate from "@/components/areas/AreaPageTemplate";

export default function Page() {
  return (
    <AreaPageTemplate
      title="Derecho Civil"
      subtitle="Soluciones jurídicas para conflictos personales y patrimoniales."
      imageSrc="/img/areas/civil.jpg"
      LeftContent={
        <>
          <p>
            Nuestro departamento civil aborda todas las áreas del derecho
            privado, brindando acompañamiento legal claro, estratégico y eficaz.
          </p>

          <ul className="list-disc ml-4 mt-4 space-y-2">
            <li>Contratos civiles y comerciales.</li>
            <li>Juicios por daños y responsabilidad civil.</li>
            <li>Sucesiones y particiones.</li>
            <li>Familia: bienes, acuerdos, conflictos patrimoniales.</li>
          </ul>
        </>
      }
    />
  );
}
