import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ellenteixeira.com.br'),
  title: {
    default: 'Ellen Teixeira - Odontologia',
    template: '%s | Ellen Teixeira',
  },
  description: 'Dra. Ellen Teixeira - Odontologia especializada em estética dental, implantes e ortodontia.',
  keywords: ['odontologia', 'dentista', 'Ellen Teixeira', 'estética dental', 'implantes', 'ortodontia'],
  authors: [{ name: 'Ellen Teixeira' }],
  creator: 'Ellen Teixeira',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Ellen Teixeira - Odontologia',
    description: 'Odontologia especializada em estética dental, implantes e ortodontia.',
    siteName: 'Ellen Teixeira Odontologia',
    images: [
      {
        url: '/images/og-image.jpg', // Adicione esta imagem depois
        width: 1200,
        height: 630,
        alt: 'Ellen Teixeira - Odontologia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ellen Teixeira - Odontologia',
    description: 'Odontologia especializada em estética dental, implantes e ortodontia.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'seu-codigo-google-search-console',
    // yandex: 'seu-codigo-yandex',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <GoogleAnalytics />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
