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
    default: "Dra. Ellen Teixeira - Odontologia",
    template: "%s | Ellen Teixeira",
  },
  description:
    "Dra. Ellen Teixeira - Especialista em prótese e implantodontia. Atendimento odontológico personalizado e humanizado no Centro do Rio de Janeiro.",
  keywords: [
    "dentista Rio de Janeiro",
    "dentista Centro RJ",
    "odontologia Rio de Janeiro",
    "Ellen Teixeira",
    "Dra. Ellen Teixeira",
    "implante dentário Rio de Janeiro",
    "implantodontia RJ",
    "prótese dentária Rio de Janeiro",
    "estética dental Rio de Janeiro",
    "clareamento dental Centro RJ",
    "ortodontia Rio de Janeiro",
    "harmonização orofacial RJ",
    "dentista Cinelândia",
    "consultório odontológico Centro Rio",
  ],
  authors: [{ name: "Ellen Teixeira" }],
  creator: "Ellen Teixeira",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Dra. Ellen Teixeira - Odontologia",
    description:
      "Especialista em prótese e implantodontia. Atendimento personalizado e humanizado no Centro do Rio de Janeiro.",
    siteName: "Dra. Ellen Teixeira - Odontologia",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ellen Teixeira - Odontologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Ellen Teixeira - Odontologia",
    description:
      "Especialista em prótese e implantodontia. Atendimento personalizado e humanizado.",
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
