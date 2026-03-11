"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Review } from "@/types/review";

interface ReviewsCarouselProps {
  reviews: Review[];
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const swiperRef = useRef<SwiperType>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (swiper: SwiperType) => {
    if (swiper.params.loop) {
      setIsBeginning(false);
      setIsEnd(false);
    } else {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <div className="overflow-hidden min-w-0">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavigationState(swiper);
        }}
        onSlideChange={(swiper) => {
          updateNavigationState(swiper);
        }}
        spaceBetween={24}
        speed={400}
        grabCursor={true}
        watchSlidesProgress={true}
        slidesPerGroup={1}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 1, spaceBetween: 20 },
          1024: { slidesPerView: 2, spaceBetween: 24 },
          1280: { slidesPerView: 2, spaceBetween: 24 },
        }}
        className="reviews-swiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.googleId}>
            <div className="bg-review-card rounded-2xl h-48 flex flex-col items-center justify-center p-6">
              <div className="flex mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-rating-star text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-center">
                {review.text || "Comentário em breve"}
              </p>
              <p className="text-text-muted text-xs mt-2">
                - {review.authorName}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex mt-2 gap-1">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-primary transition-opacity ${
            isBeginning ? "opacity-60 cursor-not-allowed" : "opacity-100"
          }`}
          aria-label="Avaliação anterior"
        >
          <FaChevronLeft className="text-primary text-xl" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-primary transition-opacity ${
            isEnd ? "opacity-60 cursor-not-allowed" : "opacity-100"
          }`}
          aria-label="Próxima avaliação"
        >
          <FaChevronRight className="text-primary text-xl" />
        </button>
      </div>
    </div>
  );
}
