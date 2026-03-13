import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "600", "700", "900"], // light, semibold, bold, black
  display: "swap",
  variable: "--font-fraunces",
  preload: true,
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://draellenteixeira.com.br"
  ),
  title: {
    default: "Dra. Ellen Teixeira - Ortodontia e Clínica Geral",
    template: "%s | Dra. Ellen Teixeira",
  },
  description:
    "Dra. Ellen Teixeira - Especialista em Ortodontia no Centro do Rio de Janeiro. Atendimento completo: ortodontia, clínica geral, estética dental, implantes e mais. Cuidado humanizado e personalizado.",
  keywords: [
    "ortodontia Rio de Janeiro",
    "ortodontia Centro RJ",
    "especialista em ortodontia Rio de Janeiro",
    "aparelho ortodôntico Rio de Janeiro",
    "alinhadores invisíveis Rio de Janeiro",
    "clínica geral odontológica Rio de Janeiro",
    "dentista Rio de Janeiro",
    "dentista Centro RJ",
    "dentista Cinelândia",
    "Dra. Ellen Teixeira",
    "estética dental Rio de Janeiro",
    "clareamento dental Centro RJ",
    "implante dentário Rio de Janeiro",
    "consultório odontológico Centro Rio",
  ],
  authors: [{ name: "Ellen Teixeira" }],
  creator: "Ellen Teixeira",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Dra. Ellen Teixeira - Ortodontia e Clínica Geral",
    description:
      "Especialista em Ortodontia no Centro do Rio de Janeiro. Atendimento completo e humanizado: ortodontia, clínica geral, estética dental e muito mais.",
    siteName: "Dra. Ellen Teixeira - Ortodontia e Clínica Geral",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dra. Ellen Teixeira - Especialista em Ortodontia e Clínica Geral no Centro do Rio de Janeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Ellen Teixeira - Ortodontia e Clínica Geral",
    description:
      "Especialista em Ortodontia no Centro do Rio de Janeiro. Ortodontia, clínica geral e estética dental com atendimento humanizado.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://draellenteixeira.com.br",
  },
  verification: {
    google: "qh7orDtUTgRIgsSwQRIDy30cZ2AE-QPLwXoJnMf8S24",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredData />
      </head>
      <body className={`${fraunces.variable} font-sans`}>
        <GoogleAnalytics />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
