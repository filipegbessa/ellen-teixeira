"use client";

import { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { contactConfig } from "@/config/contact";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Tratamentos", href: "#tratamentos" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Localização", href: "#localizacao", noMobile: true },
  ];

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="min-w-[95%] md:max-w-[615px] md:min-w-min bg-surface-elevated fixed top-4 left-1/2 -translate-x-1/2 z-50 border border-border shadow-header rounded-3xl h-[70px]">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-4 flex-1 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-32 h-12 bg-surface-muted flex items-center justify-center rounded">
              <span className="font-bold">LOGO</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => {
              if (item.noMobile) return null;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-primary text-lg font-semibold no-underline transition-opacity duration-200 hover:opacity-70 inline-block"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-1">
            <a
              href={contactConfig.phone.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center hover:bg-accent/90 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-on-dark text-xl" />
            </a>
            <a
              href={contactConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
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
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-on-dark text-lg" />
              ) : (
                <FaBars className="text-on-dark text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden p-4 rounded-3xl bg-surface-elevated absolute top-[72px] w-full shadow-header">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClick}
                  className="text-primary text-xl font-semibold no-underline transition-opacity duration-200 hover:opacity-70 inline-block"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
