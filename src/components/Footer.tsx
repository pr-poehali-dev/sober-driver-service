import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Car" size={28} className="text-primary" />
              <span className="text-xl font-bold">ТрезвыйРуль</span>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Надёжный партнёр в вопросах безопасности на дорогах с 2014 года
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Трезвый водитель</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Перевозка автомобилей</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Эвакуация</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Междугородние перевозки</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Отзывы</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Социальные сети</h4>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                <Icon name="Phone" size={20} />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                <Icon name="Mail" size={20} />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/80">
          <p>© 2024 ТрезвыйРуль. Все права защищены. ИНН 7707123456 | ОГРН 1234567890123</p>
        </div>
      </div>
    </footer>
  );
}
