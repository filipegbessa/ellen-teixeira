"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaInstagram, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";
import { contactConfig } from "@/config/contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trackInstagramClick, trackSectionNavigation } from "@/utils/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Tratamentos", href: "#tratamentos" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Localização", href: "#localizacao", noMobile: true },
  ];

  const handleMenuClick = (sectionName: string) => {
    trackSectionNavigation(sectionName);
    setMobileMenuOpen(false);
  };

  const handleOverlayClick = () => {
    setMobileMenuOpen(false);
  };

  const handleInstagramClick = () => {
    trackInstagramClick("header");
  };

  // Trava o scroll do body quando o menu está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup ao desmontar
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="min-w-[95%] md:max-w-[615px] md:min-w-min bg-surface-elevated fixed top-4 left-1/2 -translate-x-1/2 z-50 border border-border shadow-header rounded-3xl h-[70px]">
        <div className="flex items-center justify-between gap-4 h-full px-4">
          {/* Logo */}
          <a className="flex items-center no-underline" href="#inicio">
            <Image
              src="/images/logo.png"
              alt="Ellen Teixeira Odontologia"
              width={128}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </a>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => {
              if (item.noMobile) return null;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    trackSectionNavigation(item.label.toLowerCase())
                  }
                  className="text-primary text-lg font-semibold no-underline transition-opacity duration-200 hover:opacity-70 inline-block"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-1">
            <WhatsAppButton
              variant="icon"
              ariaLabel="WhatsApp"
              source="header"
            />
            <a
              href={contactConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInstagramClick}
              className="w-9 h-9 bg-gradient-to-tr from-instagram-from via-instagram-via to-instagram-to rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Instagram"
            >
              <FaInstagram className="text-on-dark text-xl" />
            </a>
            <a
              href="#localizacao"
              className="w-9 h-9 bg-location rounded-xl hidden md:flex items-center justify-center hover:bg-location-hover transition-colors"
              aria-label="Localização"
            >
              <FaMapMarkerAlt className="text-on-dark text-xl" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 bg-primary rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-on-dark text-lg" />
              ) : (
                <FaBars className="text-on-dark text-lg" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <nav
            className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[95%] bg-surface-elevated border border-border shadow-header rounded-3xl p-6 z-50 md:hidden transition-all duration-300 ease-out opacity-100 translate-y-0"
            role="navigation"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleMenuClick(item.label.toLowerCase())}
                  className="text-primary text-xl font-semibold no-underline transition-opacity duration-200 hover:opacity-70 inline-block py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
