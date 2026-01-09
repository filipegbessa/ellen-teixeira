"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getTreatments } from "@/utils/Helper";

export default function TreatmentsSection() {
  const treatments = getTreatments();
  const swiperRef = useRef<SwiperType>();

  return (
    <section id="tratamentos" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
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
              }}
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              // pagination={{
              //   clickable: true,
              //   dynamicBullets: true,
              // }}
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
                  <div className="bg-secondary rounded-2xl h-72 flex flex-col items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer p-6 text-white">
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
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-primary"
                aria-label="Tratamento anterior"
              >
                <FaChevronLeft className="text-primary text-xl" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-primary"
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
