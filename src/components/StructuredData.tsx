import { businessInfo } from "@/data/business";

/**
 * Structured data (Schema.org) for SEO
 * Provides rich snippets for search engines
 */
export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: businessInfo.professional.name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/dra-ellen.jpg`,
    description:
      businessInfo.professional.title +
      ". Atendimento odontológico personalizado e humanizado no Rio de Janeiro.",
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
      ratingValue: String(businessInfo.stats.averageRating),
      reviewCount: String(businessInfo.stats.totalReviews),
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
