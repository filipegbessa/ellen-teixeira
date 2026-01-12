import { SFTypography } from "star-flicks-ds";
import { FaInstagram, FaMapMarkedAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen pt-10">
      <div className="content-center bg-background rounded-t-[50px] flex px-16 pt-40 pb-4 !max-w-xl w-full">
        <div className="w-full flex flex-col justify-between">
          <div>
            <div id="header" className="flex flex-col items-center">
              <div className="h-28 w-28 overflow-hidden rounded-full mb-4">
                <Image
                  src="/images/header.webp"
                  alt="Header"
                  objectFit="cover"
                  width={300}
                  height={300}
                  priority
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
                <a
                  href="https://wa.me/5521981035557?text=Ola!%20gostaria%20de%20marcar%20uma%20avalia%C3%A7%C3%A3o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-surface-elevated rounded-full pt-0.5 pr-1.5 pb-1 pl-0.5">
                    <div className="bg-rose rounded-full h-16 flex items-center justify-center gap-2 transition-transform ">
                      <FaWhatsapp className="text-button-primary text-xl" />

                      <SFTypography
                        weight="light"
                        className="text-button-primary"
                      >
                        Whatsapp
                      </SFTypography>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/draellenteixeira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-surface-elevated rounded-full pt-0.5 pr-1.5 pb-1 pl-0.5">
                    <div className="bg-rose rounded-full h-16 flex items-center justify-center gap-2 transition-transform ">
                      <FaInstagram className="text-button-primary text-xl" />

                      <SFTypography
                        weight="light"
                        className="text-button-primary"
                      >
                        Instagram
                      </SFTypography>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/R.+Sete+de+Setembro,+98+-+Centro,+Rio+de+Janeiro+-+RJ,+20050-002/@-22.9053433,-43.1834055,17z/data=!3m1!4b1!4m10!1m2!2m1!1sR.+Sete+de+Setembro,+98!3m6!1s0x997f5e1703d8b5:0xfa658916427617c!8m2!3d-22.9053434!4d-43.17854!15sChdSLiBTZXRlIGRlIFNldGVtYnJvLCA5OJIBEWNvbXBvdW5kX2J1aWxkaW5n4AEA!16s%2Fg%2F11c1ydkr90?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
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
                R. Sete de Setembro, 98 - Sala 609
              </SFTypography>
              <SFTypography className="text-on-dark">
                Centro, Rio de Janeiro - RJ
              </SFTypography>
            </div>
          </div>

          <div>
            <SFTypography
              // element="footer"
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
