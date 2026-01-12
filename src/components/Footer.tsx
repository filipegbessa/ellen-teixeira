import { contactConfig } from "@/config/contact";

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Dra. Ellen Teixeira - Odontologia
          </p>
          <p className="text-sm">
            Todos os direitos reservados. CRO-RJ{" "}
            {contactConfig.professional.cro}
          </p>
        </div>
      </div>
    </footer>
  );
}
