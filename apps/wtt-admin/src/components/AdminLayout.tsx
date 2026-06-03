'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/packages', label: 'Packages' },
  { href: '/dashboard/bookings', label: 'Bookings' },
  { href: '/dashboard/enquiries', label: 'Enquiries' },
  { href: '/dashboard/reviews', label: 'Reviews' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('wtt_admin_token')) router.push('/auth/login')
  }, [router])

  function logout() {
    localStorage.removeItem('wtt_admin_token')
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <p className="font-bold text-primary text-sm">WalkToTemple</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm ${
                pathname === item.href ? 'bg-primary text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 w-full text-left">
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
