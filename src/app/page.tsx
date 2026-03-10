"use client";

import { SFTypography } from "star-flicks-ds";
import { FaInstagram, FaMapMarkedAlt } from "react-icons/fa";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trackInstagramClick } from "@/utils/analytics";
import { contactConfig } from "@/config/contact";

export default function Home() {
  return (
    <div className="flex min-h-screen pt-10">
      <div className="mx-auto bg-background rounded-t-[50px] flex px-16 pt-40 pb-4 max-w-xl w-full">
        <div className="w-full flex flex-col justify-between">
          <div>
            <div id="header" className="flex flex-col items-center">
              <div className="h-28 w-28 overflow-hidden rounded-full mb-4">
                <Image
                  src="/images/landing/header.webp"
                  alt="Dra. Ellen Teixeira"
                  width={300}
                  height={300}
                  priority
                  className="object-cover w-full h-full"
                  sizes="112px"
                />
              </div>

              <SFTypography
                element="h1"
                size="2xl"
                weight="medium"
                className="text-on-dark mb-1"
              >
                Dra. Ellen Teixeira
              </SFTypography>
              <SFTypography
                element="h2"
                weight="light"
                align="center"
                size="sm"
                className="text-on-dark"
              >
                Atendimento odontológico humanizado e com qualidade
              </SFTypography>
            </div>

            <ul className="mt-10 gap-3 flex flex-col">
              <li>
                <WhatsAppButton variant="custom" source="site-page" />
              </li>
              <li>
                <a
                  href={contactConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackInstagramClick("site-page")}
                  className="block"
                >
                  <div className="bg-surface-elevated rounded-full pt-0.5 pr-1.5 pb-1 pl-0.5">
                    <div className="bg-rose rounded-full h-16 flex items-center justify-center gap-2 transition-transform ">
                      <FaInstagram className="text-button-primary text-xl" />

                      <SFTypography
                        weight="light"
                        className="text-button-primary"
                      >
                        <span lang="en">Instagram</span>
                      </SFTypography>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={contactConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-surface-elevated rounded-full pt-0.5 pr-1.5 pb-1 pl-0.5">
                    <div className="bg-rose rounded-full h-16 flex items-center justify-center gap-2 transition-transform ">
                      <FaMapMarkedAlt className="text-button-primary text-xl" />

                      <SFTypography
                        weight="light"
                        className="text-button-primary"
                      >
                        Localização
                      </SFTypography>
                    </div>
                  </div>
                </a>
              </li>
            </ul>

            <div className="mt-5 px-5">
              <SFTypography className="text-on-dark">
                {contactConfig.address.line1}
              </SFTypography>
              <SFTypography className="text-on-dark">
                {contactConfig.address.line2}
              </SFTypography>
            </div>
          </div>

          <div>
            <SFTypography
              align="center"
              size="xs"
              className="text-on-dark mt-20 block"
            >
              © {new Date().getFullYear()} Dra. Ellen Teixeira. Todos os
              direitos reservados.
            </SFTypography>
          </div>
        </div>
      </div>
    </div>
  );
}
