import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-fraunces",
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
    "odontologia",
    "dentista",
    "Ellen Teixeira",
    "estética dental",
    "implantes",
    "ortodontia",
    "prótese dentária",
    "implantodontia",
    "Centro RJ",
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
        url: "/images/og-image.jpg", // Adicione esta imagem depois
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
    images: ["/images/og-image.jpg"],
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
    // google: 'seu-codigo-google-search-console',
    // yandex: 'seu-codigo-yandex',
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
