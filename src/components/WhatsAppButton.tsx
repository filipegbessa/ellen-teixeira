import { FaWhatsapp } from "react-icons/fa";
import { contactConfig } from "@/config/contact";
import { trackWhatsAppClick } from "@/utils/analytics";

type WhatsAppButtonVariant = "icon" | "large" | "custom";

interface WhatsAppButtonProps {
  variant?: WhatsAppButtonVariant;
  className?: string;
  ariaLabel?: string;
  source?: string; // Para identificar a origem do clique no analytics
}

/**
 * WhatsApp Button Component
 *
 * Componente reutilizável para links do WhatsApp em diferentes variações.
 *
 * Variantes:
 * - "icon": Botão pequeno apenas com ícone (usado no Header)
 * - "large": Botão grande com ícone e texto (usado no Hero)
 * - "custom": Design customizado com nested divs (usado na página /site)
 */
export default function WhatsAppButton({
  variant = "icon",
  className = "",
  ariaLabel = "WhatsApp",
  source = "unknown",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    trackWhatsAppClick(source);
  };

  const baseProps = {
    href: contactConfig.phone.whatsappUrl(),
    target: "_blank" as const,
    rel: "noopener noreferrer",
    onClick: handleClick,
  };

  // Variante: Botão apenas com ícone (Header)
  if (variant === "icon") {
    return (
      <a
        {...baseProps}
        className={`w-9 h-9 bg-accent rounded-xl flex items-center justify-center hover:bg-accent/90 transition-colors ${className}`}
        aria-label={ariaLabel}
      >
        <FaWhatsapp className="text-on-dark text-xl" />
      </a>
    );
  }

  // Variante: Botão grande com texto (HeroSection)
  if (variant === "large") {
    return (
      <a
        {...baseProps}
        className={`inline-flex items-center bg-accent text-on-dark px-6 py-3 rounded-3xl font-semibold h-20 text-xl gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-accent/90 ${className}`}
        aria-label={ariaLabel}
      >
        <FaWhatsapp className="text-3xl" />
        <span lang="en">WhatsApp</span>
      </a>
    );
  }

  // Variante: Design customizado (page.tsx /site)
  if (variant === "custom") {
    return (
      <a {...baseProps} className={`block ${className}`}>
        <div className="bg-surface-elevated rounded-full pt-0.5 pr-1.5 pb-1 pl-0.5">
          <div className="bg-rose rounded-full h-16 flex items-center justify-center gap-2 transition-transform">
            <FaWhatsapp className="text-button-primary text-xl" />
            <span className="font-light text-button-primary" lang="en">
              WhatsApp
            </span>
          </div>
        </div>
      </a>
    );
  }

  return null;
}
