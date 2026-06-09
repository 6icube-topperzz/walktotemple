'use client'
import Link from 'next/link'
import { ThemeProvider, AuthCard } from '@6icube/ui'
import { theme, brand } from '@/theme.config'
import { useAuthCard } from '@/lib/useAuthCard'

export default function LoginPage() {
  const auth = useAuthCard('login')
  return (
    <ThemeProvider theme={theme} className="min-h-screen w-full flex flex-col bg-[var(--page-bg)]">
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--surface-fg)] transition-colors"
        >
          ← Back
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <AuthCard
            variant="page"
            mode="login"
            brand={brand}
            heading="Welcome back"
            subtitle="Sign in to view your bookings"
            showGoogle
            forgotHref="/forgot-password"
            {...auth}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}
