import AreaPageTemplate from "@/components/areas/AreaPageTemplate";

export default function Page() {
  return (
    <AreaPageTemplate
      title="Asuntos Contenciosos"
      subtitle="Representación integral en conflictos judiciales y extrajudiciales."
      imageSrc="/img/areas/contencioso.jpg"
      LeftContent={
        <>
          <p>
            Contamos con amplia experiencia en litigios complejos ante
            tribunales federales, nacionales y provinciales. Asesoramos tanto a
            empresas como particulares en conflictos contractuales, civiles,
            mercantiles y administrativos.
          </p>

          <ul className="list-disc ml-4 mt-4 space-y-2">
            <li>Litigios mercantiles y civiles.</li>
            <li>Daños y perjuicios.</li>
            <li>Contencioso-administrativo y constitucional.</li>
            <li>Mediación, arbitraje y métodos alternativos.</li>
            <li>Representación ante Corte Suprema de la Nación.</li>
            <li>Ejecución de créditos y sentencias nacionales e internacionales.</li>
          </ul>
        </>
      }
    />
  );
}
