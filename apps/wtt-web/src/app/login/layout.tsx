import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login — WalkToTemple',
  description: 'Sign in to your WalkToTemple account',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
