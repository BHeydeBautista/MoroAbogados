"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Ensure worker is set for pdf.js in the browser bundle.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  url: string;
  title?: string;
  className?: string;
};

export default function PdfViewer({ url, title, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const update = () => {
      const next = Math.max(320, Math.floor(element.getBoundingClientRect().width));
      setContainerWidth(next);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(element);

    return () => ro.disconnect();
  }, []);

  const file = useMemo(() => ({ url }), [url]);

  return (
    <div ref={containerRef} className={className}>
      <Document
        file={file}
        loading={<div className="text-sm text-gray-600">Cargando PDF…</div>}
        error={
          <div className="text-sm text-gray-600">
            No se pudo mostrar el PDF.
            {url ? (
              <>
                {" "}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Abrir en otra pestaña
                </a>
              </>
            ) : null}
          </div>
        }
        onLoadSuccess={(info) => setNumPages(info.numPages)}
      >
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
          <div key={pageNumber} className="mb-4 last:mb-0 flex justify-center">
            <Page
              pageNumber={pageNumber}
              width={Math.min(containerWidth, 900)}
              renderAnnotationLayer
              renderTextLayer
              aria-label={title ? `${title} - página ${pageNumber}` : `Página ${pageNumber}`}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
