import Image from "next/image";
import { getReviews } from "@/lib/api";
import ReviewsCarousel from "./ReviewsCarousel";

export default async function ReviewsSection() {
  const reviews = await getReviews();

  return (
    <section
      id="avaliacoes"
      aria-labelledby="reviews-heading"
      className="bg-surface-section py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <h2
          id="reviews-heading"
          className="text-4xl md:text-5xl font-bold text-primary mb-12"
        >
          Avaliações dos Pacientes
        </h2>

        <div className="grid md:grid-cols-[250px_140px_1fr] gap-3">
          <div>
            <Image
              src="/images/google-ico.webp"
              alt="Google Avaliações"
              width={300}
              height={300}
              priority
              className="object-cover w-full h-auto"
            />
          </div>

          <div className="flex flex-1 justify-between flex-col">
            <p className="text-4xl font-bold text-primary">
              A sua opinião vale muito.
            </p>

            <div className="bg-surface-elevated rounded-lg shadow flex items-center justify-center aspect-square">
              <div className="w-32 h-32 bg-black" />
            </div>
          </div>

          {reviews.length > 0 ? (
            <ReviewsCarousel reviews={reviews} />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-text-muted text-lg">
                Avaliações em breve.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
