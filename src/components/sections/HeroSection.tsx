"use client";

import { FaWhatsapp } from "react-icons/fa";
import { contactConfig } from "@/config/contact";
import { businessInfo } from "@/data/business";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="bg-gradient-to-t from-primary-light to-[#c9f1ff] pt-28 pb-20 md:pt-32 md:pb-24 rounded-br-[40px] rounded-bl-[40px]"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
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

            <a
              href={contactConfig.phone.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-3xl font-semibold h-20 text-xl gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              aria-label="Agendar avaliação pelo WhatsApp"
            >
              <FaWhatsapp className="text-3xl" />
              <span>Whatsapp</span>
            </a>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Placeholder for team image */}
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center px-4">
                  Adicione imagem da equipe aqui
                  <br />
                  <span className="text-sm">(profissionais de saúde)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
