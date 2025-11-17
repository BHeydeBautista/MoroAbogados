import AreaPageTemplate from "@/components/areas/AreaPageTemplate";

export default function Page() {
  return (
    <AreaPageTemplate
      title="Derecho Laboral de Empresas"
      subtitle="Asesoramiento laboral estratégico para empresas modernas."
      imageSrc="/img/areas/laboral.jpg"
      LeftContent={
        <>
          <p>
            Brindamos acompañamiento integral a empresas en materia laboral,
            desde la contratación de personal hasta la gestión de conflictos y
            negociaciones sindicales.
          </p>

          <ul className="list-disc ml-4 mt-4 space-y-2">
            <li>Contratos laborales y convenios colectivos.</li>
            <li>Conflictos individuales y despidos.</li>
            <li>Negociación con sindicatos.</li>
            <li>Prevención de conflictos y compliance laboral.</li>
          </ul>
        </>
      }
    />
  );
}
