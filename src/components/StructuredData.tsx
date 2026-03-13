import { businessInfo } from "@/data/business";
import { getReviewsSummary } from "@/lib/api";

/**
 * Structured data (Schema.org) for SEO
 * Provides rich snippets for search engines
 */
export default async function StructuredData() {
  const summary = await getReviewsSummary();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: businessInfo.professional.name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/ellen-teixeira.webp`,
    description:
      "Especialista em Ortodontia e Clínica Geral no Centro do Rio de Janeiro. Atendimento odontológico completo e humanizado: ortodontia, clínica geral, estética dental, implantes e mais.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        businessInfo.address.street +
        (businessInfo.address.complement
          ? `, ${businessInfo.address.complement}`
          : ""),
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.stateCode,
      postalCode: businessInfo.address.zipCode,
      addressCountry: businessInfo.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: String(businessInfo.address.coordinates.latitude),
      longitude: String(businessInfo.address.coordinates.longitude),
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://draellenteixeira.com.br",
    telephone: businessInfo.contact.phone.display,
    email: businessInfo.contact.email,
    priceRange: "$$",
    openingHoursSpecification: businessInfo.businessHours.openingHours.map(
      (hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.dayOfWeek,
        opens: hours.opens,
        closes: hours.closes,
      })
    ),
    areaServed: {
      "@type": "City",
      name: "Rio de Janeiro",
    },
    sameAs: [businessInfo.contact.social.instagram.url],
    medicalSpecialty: businessInfo.specialties,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: `CRO-${businessInfo.address.stateCode}`,
      recognizedBy: {
        "@type": "Organization",
        name: `Conselho Regional de Odontologia do ${businessInfo.address.state}`,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(
        summary.totalReviews > 0
          ? summary.averageRating
          : businessInfo.stats.averageRating
      ),
      reviewCount: String(
        summary.totalReviews > 0
          ? summary.totalReviews
          : businessInfo.stats.totalReviews
      ),
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quais tratamentos a Dra. Ellen Teixeira realiza?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Dra. Ellen Teixeira é especialista em Ortodontia e atende também clínica geral, estética dental, clareamento dental, implantodontia, prótese dentária e harmonização orofacial no Centro do Rio de Janeiro.",
        },
      },
      {
        "@type": "Question",
        name: "Onde fica o consultório da Dra. Ellen Teixeira?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O consultório fica na R. México, 41, Sala 607, Cinelândia, Centro do Rio de Janeiro - CEP 20031-144.",
        },
      },
      {
        "@type": "Question",
        name: "Como agendar uma consulta com a Dra. Ellen Teixeira?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O agendamento pode ser feito pelo WhatsApp (21) 97492-4374. O atendimento é de segunda a sexta-feira, das 9h às 18h.",
        },
      },
      {
        "@type": "Question",
        name: "O implante dentário é um procedimento doloroso?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O implante dentário é realizado com anestesia local, por isso não há dor durante o procedimento. No pós-operatório, pode haver leve desconforto, controlado com medicação. A Dra. Ellen Teixeira utiliza técnicas modernas para garantir o máximo de conforto ao paciente.",
        },
      },
      {
        "@type": "Question",
        name: "O clareamento dental danifica o esmalte dos dentes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quando realizado por um profissional habilitado, o clareamento dental supervisionado é seguro e não danifica o esmalte. A Dra. Ellen Teixeira avalia cada caso individualmente para indicar o protocolo mais adequado.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a formação da Dra. Ellen Teixeira?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Dra. Ellen Teixeira é graduada em Odontologia pela UFF, com Especialização em Ortodontia pela PUC-Rio e Mestrado em Odontologia pela UFF. É especialista registrada em Ortodontia com CRO-RJ 41617 e mais de 13 anos de experiência clínica.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
