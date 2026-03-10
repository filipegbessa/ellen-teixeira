import { getWhatsAppUrl } from "../Helper";
import { businessInfo } from "@/data/business";

describe("getWhatsAppUrl", () => {
  it("gera URL correta com a mensagem padrão", () => {
    const url = getWhatsAppUrl();
    const expectedNumber = businessInfo.contact.phone.number;
    const expectedMessage = encodeURIComponent(
      businessInfo.contact.phone.whatsappMessage
    );

    expect(url).toBe(
      `https://wa.me/${expectedNumber}?text=${expectedMessage}`
    );
  });

  it("gera URL com mensagem customizada", () => {
    const customMessage = "Olá! Quero agendar uma consulta";
    const url = getWhatsAppUrl(customMessage);

    expect(url).toBe(
      `https://wa.me/${businessInfo.contact.phone.number}?text=${encodeURIComponent(customMessage)}`
    );
  });

  it("o número de telefone não contém caracteres inválidos para URL", () => {
    const url = getWhatsAppUrl();
    // O número deve ser apenas dígitos (sem +, espaços, parênteses)
    expect(businessInfo.contact.phone.number).toMatch(/^\d+$/);
    expect(url).toContain(businessInfo.contact.phone.number);
  });

  it("a mensagem padrão está encodada corretamente", () => {
    const url = getWhatsAppUrl();
    // A URL não deve conter espaços crus — devem estar encodados
    const queryPart = url.split("?text=")[1];
    expect(queryPart).not.toContain(" ");
  });
});
