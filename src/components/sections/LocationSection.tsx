"use client";

import { FaMapMarkerAlt, FaClock, FaEnvelope, FaPhone } from "react-icons/fa";
import { contactConfig } from "@/config/contact";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { trackContactClick } from "@/utils/analytics";

export default function LocationSection() {
  return (
    <section
      id="localizacao"
      aria-labelledby="location-heading"
      className="bg-secondary py-16 md:py-24 rounded-tr-[40px] rounded-tl-[40px]"
    >
      <div className="container mx-auto px-4">
        <h2
          id="location-heading"
          className="text-4xl md:text-5xl font-bold text-on-dark mb-12"
        >
          Localização
        </h2>

        <div className="relative">
          <div className="md:border-[6px] border-white md:rounded-[80px] rounded-3xl shadow-map overflow-hidden md:h-[600px] h-[400px] relative md:mx-5">
            <GoogleMapEmbed
              src={contactConfig.address.mapsEmbedUrl}
              title="Localização da clínica Dra. Ellen Teixeira"
            />
          </div>

          <div className="bg-surface-elevated shadow-card text-left rounded-3xl md:max-w-[500px] md:p-9 p-7 md:absolute relative z-10 md:-bottom-8 bottom-8 md:mx-0 mx-4">
            <h3
              id="location-details"
              className="text-3xl font-bold text-primary mb-1"
            >
              No coração do Rio de Janeiro
            </h3>
            <p className="text-lg mb-7 text-secondary">
              Próximo ao metrô da Cinelândia
            </p>

            <div className="grid gap-3 text-secondary">
              <div className="flex items-start gap-3 text-xl">
                <FaMapMarkerAlt className=" text-2xl mt-1" />
                <div>
                  <p>{contactConfig.address.line1}</p>
                  <p>{contactConfig.address.line2}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className=" text-2xl" />
                <a
                  href={`mailto:${contactConfig.email}`}
                  onClick={() => trackContactClick("email")}
                  className="hover:text-primary transition-colors text-xl"
                >
                  {contactConfig.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className=" text-2xl" />
                <a
                  href={`tel:${contactConfig.phone.number}`}
                  onClick={() => trackContactClick("phone")}
                  className="hover:text-primary transition-colors text-xl"
                >
                  {contactConfig.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
