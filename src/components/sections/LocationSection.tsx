"use client";

import { FaMapMarkerAlt, FaClock, FaEnvelope, FaPhone } from "react-icons/fa";
import { contactConfig } from "@/config/contact";

export default function LocationSection() {
  return (
    <section
      id="localizacao"
      className="bg-secondary py-16 md:py-24 rounded-tr-[40px] rounded-tl-[40px]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Localização
        </h2>

        <div className="relative">
          <div className="bg-white shadow-[0_0.375rem_2.125rem_0_rgba(32,46,173,0.2)] text-left rounded-[2.5rem] max-w-[33rem] py-10 px-12 absolute z-10 -bottom-8">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-7">
                No coração do Rio de Janeiro
              </h3>

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
                    className="hover:text-primary transition-colors text-xl"
                  >
                    {contactConfig.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className=" text-2xl" />
                  <a
                    href={`tel:${contactConfig.phone.number}`}
                    className="hover:text-primary transition-colors text-xl"
                  >
                    {contactConfig.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-[6px] border-white rounded-[6rem] shadow-[0_2.125rem_5.625rem_0_rgba(32,46,173,0.2)] overflow-hidden h-[600px] relative mx-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2970815773357!2d-43.17845892461447!3d-22.906847879238773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f5e0c2e0cad%3A0x8e1c19b85e3b3c3!2sR.%20Sete%20de%20Setembro%2C%2098%20-%20Centro%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da clínica Dra. Ellen Teixeira"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
