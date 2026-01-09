/**
 * Contact and business information configuration
 *
 * Este arquivo re-exporta informações do businessInfo para manter
 * compatibilidade com componentes existentes.
 *
 * Para editar informações do negócio, veja: src/data/business.ts
 */

import { businessInfo } from "@/data/business";
import { getWhatsAppUrl } from "@/utils/Helper";

export const contactConfig = {
  phone: {
    number: businessInfo.contact.phone.number,
    display: businessInfo.contact.phone.display,
    whatsappUrl: getWhatsAppUrl,
  },
  email: businessInfo.contact.email,
  social: {
    instagram: businessInfo.contact.social.instagram.url,
  },
  professional: {
    name: businessInfo.professional.name,
    cro: businessInfo.professional.cro,
  },
  address: {
    line1: businessInfo.address.formatted.line1,
    line2: businessInfo.address.formatted.line2,
    full: businessInfo.address.formatted.full,
  },
  businessHours: {
    days: businessInfo.businessHours.weekdays.days,
    time: businessInfo.businessHours.weekdays.display,
  },
} as const;
