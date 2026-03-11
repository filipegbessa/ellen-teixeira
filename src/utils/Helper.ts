import { businessInfo } from "@/data/business";
import { treatments } from "@/data/treatments";

export const getWhatsAppUrl = (customMessage?: string) => {
  const message = customMessage || businessInfo.contact.phone.whatsappMessage;
  return `https://wa.me/${
    businessInfo.contact.phone.number
  }?text=${encodeURIComponent(message)}`;
};
export const getTreatments = () => treatments;
