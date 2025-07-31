// components/areas/AreaContent.tsx
export default function AreaContent() {
  return (
    <div className="space-y-8 text-base leading-relaxed">
      <section>
        <h2 className="text-2xl font-semibold mb-2">Servicios destacados</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Inscripciones y registros societarios.</li>
          <li>Constitución de sociedades y apertura de sucursales.</li>
          <li>Representación de sociedades ante organismos públicos.</li>
          <li>Redacción de convenios de accionistas.</li>
          <li>Reorganizaciones societarias, fusiones y adquisiciones (M&A).</li>
          <li>Inversiones extranjeras y estructuras societarias locales.</li>
          <li>Contratos de colaboración empresaria y joint ventures.</li>
          <li>Auditorías legales (due diligence).</li>
          <li>Resolución de conflictos entre socios y accionistas.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Nuestra experiencia</h2>
        <p>
          Hemos acompañado a empresas locales e internacionales en todo tipo de procesos
          societarios, desde su fundación hasta complejas fusiones y adquisiciones. Brindamos
          un enfoque estratégico y personalizado en cada asesoramiento, ajustado a la
          normativa vigente y las necesidades del cliente.
        </p>
      </section>
    </div>
  );
}
