import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'WalkToTemple — Sacred Journeys, Simplified',
  description: 'Curated pilgrimage packages across Telangana, Andhra Pradesh and India. Transport + Darshan + Accommodation — all arranged.',
  keywords: 'pilgrimage packages, Tirupati tour, Yadadri darshan, Srisailam package, Char Dham yatra, Jyotirlinga tour',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te">
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <Breadcrumb />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
