"use client";

import { businessInfo } from "@/data/business";

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-surface-section py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-9">
          {businessInfo.professional.name}
        </h2>

        <div className="md:grid md:grid-cols-[487px_1fr] flex flex-col gap-5">
          <div className="grid md:grid-cols-[182px_1fr] grid-cols-2 gap-2">
            <div className="grid gap-2 grid-rows-2 text-on-dark">
              <div className="bg-secondary rounded-[20px] flex flex-col justify-center p-4 gap-3 md:aspect-square">
                <p className="text-6xl font-black ">
                  {businessInfo.professional.experienceYears}
                </p>
                <p className="leading-tight font-light text-lg">
                  Anos de experiência
                </p>
              </div>
              <div className="bg-secondary rounded-[20px]  flex flex-col justify-center p-4 gap-1 md:aspect-square">
                <p className="font-semibold text-base">Formação:</p>
                <p className=" text-sm">
                  Odontologia pela
                  <br />
                  Universidade Federal
                  <br />
                  do Rio de Janeiro
                </p>
              </div>
            </div>

            <div className="bg-placeholder h-full rounded-[20px]">
              <p className="">Foto da Dra. Ellen</p>
            </div>
          </div>

          <div className="rounded-[20px] text-secondary">
            <p className="leading-relaxed">{businessInfo.professional.bio}</p>

            <div className="space-y-2">
              {businessInfo.qualifications.map((qual, index) => (
                <div key={index} className="">
                  <p className="text-sm">- {qual.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
