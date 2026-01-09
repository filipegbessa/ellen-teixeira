"use client";

import { getReviews } from "@/utils/Helper";

export default function ReviewsSection() {
  const reviews = getReviews();
  return (
    <section id="avaliacoes" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Avaliações dos Pacientes
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Google Reviews Illustration */}
          <div className="space-y-6">
            {/* Phone Mockup with Google Reviews */}
            <div className="bg-white rounded-3xl p-8 shadow-lg max-w-xs mx-auto">
              <div className="border-4 border-gray-800 rounded-3xl p-4 relative">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-b-2xl"></div>

                {/* Google logo placeholder */}
                <div className="text-center pt-4 pb-8">
                  <div className="text-2xl font-bold">Google</div>
                </div>

                {/* Review items */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text and QR Code */}
            <div className="text-center space-y-4">
              <p className="text-2xl font-bold text-gray-900">
                A sua
                <br />
                opnião
                <br />
                vale
                <br />
                muito.
              </p>

              {/* QR Code Placeholder */}
              <div className="inline-block p-4 bg-white rounded-lg shadow">
                <div className="w-32 h-32 bg-gray-800 rounded grid grid-cols-3 gap-1 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Review Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-200 rounded-2xl h-48 flex flex-col items-center justify-center p-6"
                >
                  <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-center">
                    {review.comment || "Comentário em breve"}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    - {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
