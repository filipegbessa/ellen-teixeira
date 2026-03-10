import { render, screen } from "@testing-library/react";
import WhatsAppButton from "../WhatsAppButton";
import { contactConfig } from "@/config/contact";

jest.mock("@/utils/analytics", () => ({
  trackWhatsAppClick: jest.fn(),
}));

describe("WhatsAppButton", () => {
  const expectedUrl = contactConfig.phone.whatsappUrl();

  describe('variante "icon"', () => {
    it("renderiza link com href correto", () => {
      render(<WhatsAppButton variant="icon" ariaLabel="WhatsApp" />);
      const link = screen.getByRole("link", { name: /whatsapp/i });
      expect(link).toHaveAttribute("href", expectedUrl);
    });

    it("abre em nova aba com rel correto", () => {
      render(<WhatsAppButton variant="icon" ariaLabel="WhatsApp" />);
      const link = screen.getByRole("link", { name: /whatsapp/i });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe('variante "large"', () => {
    it("renderiza link com href correto", () => {
      render(
        <WhatsAppButton variant="large" ariaLabel="Agendar pelo WhatsApp" />
      );
      const link = screen.getByRole("link", { name: /agendar pelo whatsapp/i });
      expect(link).toHaveAttribute("href", expectedUrl);
    });

    it("exibe o texto WhatsApp", () => {
      render(
        <WhatsAppButton variant="large" ariaLabel="Agendar pelo WhatsApp" />
      );
      expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    });
  });

  describe('variante "custom"', () => {
    it("renderiza link com href correto", () => {
      render(<WhatsAppButton variant="custom" />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", expectedUrl);
    });
  });

  it("a URL gerada aponta para o número correto", () => {
    render(<WhatsAppButton variant="icon" ariaLabel="WhatsApp" />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link.getAttribute("href")).toContain(
      contactConfig.phone.number
    );
  });
});
