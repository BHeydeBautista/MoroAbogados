import AreaPageTemplate from "@/components/areas/AreaPageTemplate";

export default function Page() {
  return (
    <AreaPageTemplate
      title="Concursal"
      subtitle="Asesoramiento estratégico en insolvencia, concursos y reestructuración."
      imageSrc="/img/areas/concursal.jpg"
      LeftContent={
        <>
          <p>
            Asistimos a empresas y particulares en todas las etapas de los
            procesos concursales, buscando siempre soluciones que protejan la
            continuidad y el valor del negocio.
          </p>

          <ul className="list-disc ml-4 mt-4 space-y-2">
            <li>Concursos preventivos y quiebras.</li>
            <li>Representación de acreedores y deudores.</li>
            <li>Reestructuración de pasivos.</li>
            <li>Acuerdos preventivos extrajudiciales.</li>
          </ul>
        </>
      }
    />
  );
}
