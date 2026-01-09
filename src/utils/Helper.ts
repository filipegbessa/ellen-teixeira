import { businessInfo } from "@/data/business";
import { treatments } from "@/data/treatments";

export const getFormattedAddress = () => businessInfo.address.formatted;
export const getContactPhone = () => businessInfo.contact.phone;
export const getWhatsAppUrl = (customMessage?: string) => {
  const message = customMessage || businessInfo.contact.phone.whatsappMessage;
  return `https://wa.me/${
    businessInfo.contact.phone.number
  }?text=${encodeURIComponent(message)}`;
};
export const getBusinessHours = () => businessInfo.businessHours;
export const getTreatments = () => treatments;
export const getReviews = () => businessInfo.reviews;
