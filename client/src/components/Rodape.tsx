import { Sparkles, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

/**
 * COMPONENTE RODAPÉ
 * 
 * Rodapé do site com informações de contato, links úteis e copyright.
 * Presente em todas as páginas para manter consistência visual.
 */

export function Rodape() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">AutoBrilho</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Serviços automotivos de qualidade premium. 
              Cuidamos do seu veículo com profissionalismo e dedicação.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-sobre">
                    Sobre Nós
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/servicos">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-servicos">
                    Serviços
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/promocoes">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-promocoes">
                    Promoções
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-contato">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Av. Paulista, 1000<br />São Paulo - SP
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+551133334444" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  (11) 3333-4444
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:contato@autobrilho.com.br" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  contato@autobrilho.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h3 className="font-semibold mb-4">Horário</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>Segunda a Sexta:</p>
                  <p className="font-medium text-foreground">08:00 às 18:00</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>Sábados:</p>
                  <p className="font-medium text-foreground">08:00 às 13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {anoAtual} AutoBrilho Lava Jato. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
