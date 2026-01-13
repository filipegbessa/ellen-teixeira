"use client";

import Image from "next/image";
import { getReviews } from "@/utils/Helper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ReviewsSection() {
  const reviews = getReviews();

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

          <div className="overflow-hidden min-w-0">
            <Swiper
              spaceBetween={24}
              speed={400}
              grabCursor={true}
              watchSlidesProgress={true}
              slidesPerGroup={1}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              className="reviews-swiper"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="bg-review-card rounded-2xl h-48 flex flex-col items-center justify-center p-6">
                    <div className="flex mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-rating-star text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-center">
                      {review.comment || "Comentário em breve"}
                    </p>
                    <p className="text-text-muted text-xs mt-2">
                      - {review.author}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
