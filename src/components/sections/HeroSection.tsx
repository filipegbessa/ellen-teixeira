"use client";

import { businessInfo } from "@/data/business";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="bg-gradient-to-t from-primary-light to-secondary-light pt-28 pb-20 md:pt-32 md:pb-24 rounded-br-[40px] rounded-bl-[40px]"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
            >
              Seu Sorriso
              <br />
              Merece o<br />
              Melhor Cuidado
            </h1>

            <p className="text-lg leading-relaxed max-w-xl text-secondary">
              Sou a {businessInfo.professional.name},{" "}
              {businessInfo.professional.title.toLowerCase()}. Ofereço
              atendimento odontológico personalizado e humanizado, utilizando as
              mais modernas técnicas em{" "}
              {businessInfo.specialties.slice(0, -1).join(", ").toLowerCase()} e{" "}
              {businessInfo.specialties[
                businessInfo.specialties.length - 1
              ].toLowerCase()}
              . Meu compromisso é proporcionar saúde e beleza ao seu sorriso.
            </p>

            <WhatsAppButton
              variant="large"
              ariaLabel="Agendar avaliação pelo WhatsApp"
              source="hero"
            />
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src={"/images/hero.png"}
              alt="Foto da Dra. Ellen Teixeira"
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
