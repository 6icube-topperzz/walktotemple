'use client'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

const AUTH_ROUTES = ['/login', '/register', '/forgot-password']

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = AUTH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))

  if (isAuth) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <Breadcrumb />
      <main>{children}</main>
      <Footer />
    </>
  )
}
