import { render, screen } from "@testing-library/react";
import Page from "../page";
import { contactConfig } from "@/config/contact";

// next/image não funciona em ambiente de test — mock simples
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    priority: _priority,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

// star-flicks-ds não disponível em ambiente de test
jest.mock("star-flicks-ds", () => ({
  SFTypography: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span {...props}>{children}</span>
  ),
}));

// Analytics — sem side effects nos testes
jest.mock("@/utils/analytics", () => ({
  trackInstagramClick: jest.fn(),
  trackWhatsAppClick: jest.fn(),
}));

// WhatsAppButton — mock para isolar o teste do page.tsx
jest.mock("@/components/WhatsAppButton", () => ({
  __esModule: true,
  default: ({ source }: { source: string }) => (
    <a href={`https://wa.me/test`} data-testid={`whatsapp-button-${source}`}>
      WhatsApp
    </a>
  ),
}));

describe("Page (rota /)", () => {
  beforeEach(() => {
    render(<Page />);
  });

  it("renderiza o link do Instagram com href correto do contactConfig", () => {
    const instagramLink = screen.getByRole("link", { name: /instagram/i });
    expect(instagramLink).toHaveAttribute(
      "href",
      contactConfig.social.instagram
    );
  });

  it("o link do Instagram abre em nova aba com rel correto", () => {
    const instagramLink = screen.getByRole("link", { name: /instagram/i });
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("exibe o endereço line1 do contactConfig", () => {
    expect(screen.getByText(contactConfig.address.line1)).toBeInTheDocument();
  });

  it("exibe o endereço line2 do contactConfig", () => {
    expect(screen.getByText(contactConfig.address.line2)).toBeInTheDocument();
  });
});
