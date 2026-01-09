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
    // { label: "Início", href: "#inicio" },
    // { label: "Sobre", href: "#sobre" },
    { label: "Tratamentos", href: "#tratamentos" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Localização", href: "#localizacao" },
  ];

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white fixed top-4 left-1/2 -translate-x-1/2 z-50 border border-blue-600/10 shadow-[0_11px_34px_0_rgba(32,46,173,0.1)] rounded-[20px] h-[70px] max-w-[615px] w-full px-4">
      <div className="px-3 py-[15px] h-full">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-32 h-12 bg-gray-200 flex items-center justify-center rounded">
              <span className="font-bold">LOGO</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-primary text-lg font-semibold no-underline transition-opacity duration-200 hover:opacity-70 inline-block"
              >
                {item.label}
              </a>
            ))}
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
              className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors"
              aria-label="Localização"
            >
              <FaMapMarkerAlt className="text-white text-xl" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors ml-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-white text-xl" />
              ) : (
                <FaBars className="text-white text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClick}
                  className="text-primary text-xl font-semibold no-underline transition-opacity duration-200 hover:opacity-70 inline-block px-4 py-2 rounded"
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
