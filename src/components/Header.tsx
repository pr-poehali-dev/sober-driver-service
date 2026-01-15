import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Car" size={32} className="text-primary" />
          <span className="text-2xl font-bold">ТрезвыйРуль</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
          <a href="#advantages" className="hover:text-primary transition-colors">Преимущества</a>
          <a href="#geography" className="hover:text-primary transition-colors">География</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
        </nav>
        <Button size="lg" className="hidden md:inline-flex">
          <Icon name="Phone" size={18} className="mr-2" />
          +7 (800) 555-35-35
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Icon name="Menu" size={24} />
        </Button>
      </div>
    </header>
  );
}
