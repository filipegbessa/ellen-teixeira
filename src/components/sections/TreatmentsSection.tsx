"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles (only core and pagination - navigation is custom)
import "swiper/css";
import "swiper/css/pagination";
import { getTreatments } from "@/utils/Helper";

export default function TreatmentsSection() {
  const treatments = getTreatments();
  const swiperRef = useRef<SwiperType>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (swiper: SwiperType) => {
    // Se loop está ativado, os botões nunca ficam desabilitados
    if (swiper.params.loop) {
      setIsBeginning(false);
      setIsEnd(false);
    } else {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <section
      id="tratamentos"
      aria-labelledby="treatments-heading"
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="max-w-3xl">
            <h2
              id="treatments-heading"
              className="text-4xl md:text-5xl font-bold text-primary mb-4"
            >
              Tratamentos
            </h2>
            <p className="leading-relaxed text-secondary">
              Ofereço uma ampla gama de tratamentos odontológicos personalizados
              para atender às suas necessidades específicas. Com anos de
              experiência e formação especializada, estou comprometida em
              proporcionar os melhores cuidados, utilizando as mais recentes
              tecnologias e técnicas avançadas para garantir sua saúde bucal e
              estética.
            </p>
          </div>

          {/* Treatment Carousel */}
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateNavigationState(swiper);
              }}
              onSlideChange={(swiper) => {
                updateNavigationState(swiper);
              }}
              modules={[Pagination]}
              spaceBetween={24}
              speed={400}
              // loop={treatments.length > 4}
              grabCursor={true}
              watchSlidesProgress={true}
              slidesPerGroup={1}
              breakpoints={{
                // Mobile: 1 slide
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                // Tablet: 2 slides
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                // Desktop: 3 slides
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                // Large desktop: 4 slides (grid completo)
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="treatments-swiper"
            >
              {treatments.map((treatment) => (
                <SwiperSlide key={treatment.id}>
                  <div className="bg-secondary rounded-2xl h-72 flex flex-col items-center justify-center hover:bg-card-hover transition-colors cursor-pointer p-6 text-on-dark">
                    <p className=" font-semibold text-xl mb-2">
                      {treatment.name}
                    </p>
                    <p className=" text-sm text-center">
                      {treatment.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="flex mt-2 gap-1">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-primary transition-opacity ${
                  isBeginning ? "opacity-60 cursor-not-allowed" : "opacity-100"
                }`}
                aria-label="Tratamento anterior"
              >
                <FaChevronLeft className="text-primary text-xl" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-primary transition-opacity ${
                  isEnd ? "opacity-60 cursor-not-allowed" : "opacity-100"
                }`}
                aria-label="Próximo tratamento"
              >
                <FaChevronRight className="text-primary text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
