import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ellen Teixeira - Odontologia",
    short_name: "Ellen Teixeira",
    description:
      "Odontologia especializada em estética dental, implantes e ortodontia.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#452B9E",
    orientation: "portrait",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
