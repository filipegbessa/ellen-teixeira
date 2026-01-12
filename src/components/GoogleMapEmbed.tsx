"use client";

import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { trackMapInteraction } from "@/utils/analytics";

interface GoogleMapEmbedProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Google Maps Embed with Lazy Loading
 *
 * This component implements a performance-optimized Google Maps embed:
 * - Desktop: Loads map automatically for better UX
 * - Mobile: Shows placeholder/facade until user clicks to load (saves data)
 * - Prevents loading heavy iframe on mobile until needed
 * - Reduces data usage for mobile users who don't interact with the map
 */
export default function GoogleMapEmbed({
  src,
  title,
  className = "",
}: GoogleMapEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se é mobile (viewport < 768px = md breakpoint do Tailwind)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verifica no mount
    checkMobile();

    // Se não for mobile, carrega automaticamente
    if (window.innerWidth >= 768) {
      setIsLoaded(true);
    }

    // Adiciona listener para mudanças de viewport
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLoadMap = () => {
    trackMapInteraction("map_load");
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return (
      <button
        onClick={handleLoadMap}
        className={`w-full h-full bg-gradient-to-br from-primary-light to-secondary-light flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-[1.02] ${className}`}
        aria-label="Carregar mapa interativo"
      >
        <FaMapMarkerAlt className="text-6xl text-primary" />
        <div className="text-center">
          <p className="text-xl font-semibold text-primary mb-2">
            Ver Mapa Interativo
          </p>
          <p className="text-sm text-secondary">
            Clique para carregar o Google Maps
          </p>
        </div>
      </button>
    );
  }

  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
      className={className}
    />
  );
}
