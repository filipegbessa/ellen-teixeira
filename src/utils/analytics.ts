/**
 * Google Analytics Event Tracking Utilities
 *
 * Funções utilitárias para trackear eventos customizados no Google Analytics.
 * Todas as funções verificam se o gtag está disponível antes de enviar eventos.
 */

/**
 * Verifica se o Google Analytics está disponível
 */
const isGtagAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Trackear cliques no botão do WhatsApp
 * @param source - Origem do clique (ex: "header", "hero", "site-page")
 */
export const trackWhatsAppClick = (source: string) => {
  if (isGtagAvailable()) {
    window.gtag("event", "whatsapp_click", {
      event_category: "contact",
      event_label: source,
      value: 1,
    });
  }
};

/**
 * Trackear cliques no Instagram
 * @param source - Origem do clique (ex: "header", "site-page")
 */
export const trackInstagramClick = (source: string) => {
  if (isGtagAvailable()) {
    window.gtag("event", "instagram_click", {
      event_category: "social",
      event_label: source,
      value: 1,
    });
  }
};

/**
 * Trackear navegação para uma seção específica
 * @param sectionName - Nome da seção (ex: "sobre", "tratamentos", "avaliacoes")
 */
export const trackSectionNavigation = (sectionName: string) => {
  if (isGtagAvailable()) {
    window.gtag("event", "section_navigation", {
      event_category: "navigation",
      event_label: sectionName,
      value: 1,
    });
  }
};

/**
 * Trackear interações com o Swiper de reviews
 * @param action - Ação realizada (ex: "slide_next", "slide_prev", "pagination_click")
 * @param slideIndex - Índice do slide (opcional)
 */
export const trackSwiperInteraction = (action: string, slideIndex?: number) => {
  if (isGtagAvailable()) {
    window.gtag("event", "swiper_interaction", {
      event_category: "engagement",
      event_label: action,
      value: slideIndex !== undefined ? slideIndex : 0,
    });
  }
};

/**
 * Trackear cliques no botão de localização/mapa
 * @param action - Ação realizada (ex: "map_load", "directions_click")
 */
export const trackMapInteraction = (action: string) => {
  if (isGtagAvailable()) {
    window.gtag("event", "map_interaction", {
      event_category: "engagement",
      event_label: action,
      value: 1,
    });
  }
};

/**
 * Trackear cliques em links de contato (email, telefone)
 * @param contactType - Tipo de contato (ex: "email", "phone")
 */
export const trackContactClick = (contactType: string) => {
  if (isGtagAvailable()) {
    window.gtag("event", "contact_click", {
      event_category: "contact",
      event_label: contactType,
      value: 1,
    });
  }
};

/**
 * Trackear visualização de seção (scroll tracking)
 * @param sectionName - Nome da seção visualizada
 */
export const trackSectionView = (sectionName: string) => {
  if (isGtagAvailable()) {
    window.gtag("event", "section_view", {
      event_category: "engagement",
      event_label: sectionName,
      non_interaction: true, // Não afeta bounce rate
    });
  }
};
