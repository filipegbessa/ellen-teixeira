import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ellen Teixeira - Odontologia',
  description: 'Site da Dra. Ellen Teixeira - Odontologia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
