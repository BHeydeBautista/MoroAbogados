import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'Moro & Asociados - Estudio Jurídico',
  description: 'Asesoramiento jurídico integral en diversas áreas del derecho.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-[#0F1C2E] text-white m-0 p-0 overflow-x-hidden">
        <LanguageProvider>
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}