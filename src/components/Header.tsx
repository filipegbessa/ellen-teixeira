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
    // md:max-w-[615px] w-full px-4 max-w-95%]
    <header className="min-w-[95%] md:max-w-[615px] md:min-w-min bg-white fixed top-4 left-1/2 -translate-x-1/2 z-50 border border-blue-600/10 shadow-[0_11px_34px_0_rgba(32,46,173,0.1)] rounded-3xl h-[70px]">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-4 flex-1 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-32 h-12 bg-gray-200 flex items-center justify-center rounded">
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
              className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-white text-xl" />
            </a>
            <a
              href={contactConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white text-xl" />
            </a>
            <a
              href="#localizacao"
              className="w-9 h-9 bg-gray-800 rounded-xl hidden md:flex items-center justify-center hover:bg-gray-700 transition-colors"
              aria-label="Localização"
            >
              <FaMapMarkerAlt className="text-white text-xl" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors bg-primary"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-white text-lg" />
              ) : (
                <FaBars className="text-white text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden p-4 rounded-3xl bg-white absolute top-[72px] w-full">
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
