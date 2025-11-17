import AreaPageTemplate from "@/components/areas/AreaPageTemplate";

export default function Page() {
  return (
    <AreaPageTemplate
      title="Administrativo, Constitucional y Económico"
      subtitle="Asistencia legal frente al Estado, procesos administrativos y control constitucional."
      imageSrc="/img/areas/administrativo.jpg"
      LeftContent={
        <>
          <p>
            Nuestro equipo brinda asesoría especializada en todas las etapas de
            la relación entre el sector privado y los organismos públicos.
            Abordamos procedimientos administrativos, impugnaciones, defensa en
            sanciones y litigios ante tribunales competentes.
          </p>
          <ul className="list-disc ml-4 mt-4 space-y-2">
            <li>Procedimientos administrativos y sancionatorios.</li>
            <li>Participación en licitaciones públicas.</li>
            <li>Reclamos por inconstitucionalidad de normas.</li>
            <li>Asesoramiento en regulación estatal.</li>
          </ul>
        </>
      }
    />
  );
}
