import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'MORO ABOGADOS',
  description: 'Asesoramiento jurídico integral en diversas áreas del derecho.',
  icons: {
    icon: '/favicon.ico', // o /icon.png
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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