import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
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

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Безопасная дорога домой
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Услуги трезвого водителя и перевозки автомобилей по всей России. Быстро, надёжно, профессионально.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Icon name="PhoneCall" size={20} className="mr-2" />
                Заказать сейчас
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { icon: 'Clock', value: '15 мин', label: 'Время подачи' },
              { icon: 'Shield', value: '100%', label: 'Безопасность' },
              { icon: 'MapPin', value: '85+', label: 'Городов России' },
              { icon: 'Users', value: '50 000+', label: 'Довольных клиентов' }
            ].map((stat, index) => (
              <Card key={index} className="text-center animate-scale-in hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <Icon name={stat.icon} size={32} className="mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг для вашего комфорта и безопасности
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/4f082527-2d49-403e-8cb0-653c28bb75d1/files/320101e4-ed97-4dbe-ab63-fcbdad3855ba.jpg" 
                  alt="Трезвый водитель"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Steering" size={28} className="text-primary" />
                  <h3 className="text-3xl font-bold">Трезвый водитель</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Профессиональный водитель приедет к вам и доставит вас и ваш автомобиль в нужное место безопасно и комфортно.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Подача автомобиля за 15-20 минут',
                    'Опытные водители с безупречной репутацией',
                    'Работаем 24/7 без выходных',
                    'Фиксированная стоимость без скрытых платежей'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" size="lg">
                  Заказать водителя
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-secondary/20 to-primary/20 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/4f082527-2d49-403e-8cb0-653c28bb75d1/files/cc5c61e1-171c-412f-8004-6cbf14a5f773.jpg" 
                  alt="Перевозка автомобилей"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="PackageOpen" size={28} className="text-primary" />
                  <h3 className="text-3xl font-bold">Перевозка авто</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Безопасная транспортировка вашего автомобиля на эвакуаторе или автовозе в любую точку России.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Перевозка по всей России',
                    'Эвакуаторы и автовозы разной грузоподъёмности',
                    'Страхование груза на весь путь',
                    'Онлайн-отслеживание местоположения'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" size="lg">
                  Рассчитать доставку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="advantages" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Более 10 лет на рынке, тысячи довольных клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: 'BadgeCheck',
                title: 'Профессионализм',
                description: 'Все наши водители проходят строгий отбор и регулярное обучение. Стаж вождения от 5 лет.'
              },
              {
                icon: 'Timer',
                title: 'Быстрая подача',
                description: 'Средняя подача автомобиля 15-20 минут в пределах города. Работаем круглосуточно.'
              },
              {
                icon: 'Lock',
                title: 'Полная безопасность',
                description: 'Страхование, контроль качества услуг, проверенные водители с чистой репутацией.'
              },
              {
                icon: 'Wallet',
                title: 'Честные цены',
                description: 'Никаких скрытых доплат и комиссий. Цена фиксируется при заказе и не меняется.'
              },
              {
                icon: 'Headphones',
                title: 'Поддержка 24/7',
                description: 'Наша служба поддержки всегда на связи и готова помочь в любое время суток.'
              },
              {
                icon: 'Star',
                title: 'Высокий рейтинг',
                description: 'Средний рейтинг 4.9 из 5 на основе более 15 000 отзывов наших клиентов.'
              }
            ].map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={advantage.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="geography" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">География работы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Работаем по всей России — от Калининграда до Владивостока
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Icon name="MapPinned" size={28} className="text-primary" />
                    Основные направления
                  </h3>
                  <div className="space-y-4">
                    {[
                      { region: 'Москва и МО', cities: 'Полное покрытие' },
                      { region: 'Санкт-Петербург и ЛО', cities: 'Полное покрытие' },
                      { region: 'Центральный федеральный округ', cities: '45+ городов' },
                      { region: 'Южный и Северо-Кавказский ФО', cities: '28+ городов' },
                      { region: 'Приволжский ФО', cities: '35+ городов' },
                      { region: 'Сибирский и Дальневосточный ФО', cities: '22+ города' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
                        <div>
                          <div className="font-semibold">{item.region}</div>
                          <div className="text-sm text-muted-foreground">{item.cities}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Icon name="Route" size={28} className="text-primary" />
                      Межгород и дальние перевозки
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Перевозим автомобили между любыми городами России. Рассчитываем маршрут, сроки и стоимость индивидуально.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Доставка из салона в любой город',
                        'Перегон автомобиля после покупки',
                        'Переезд в другой регион',
                        'Сезонная транспортировка'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon name="ArrowRight" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button size="lg" className="mt-6">
                    <Icon name="Calculator" size={20} className="mr-2" />
                    Рассчитать маршрут
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ответы на самые популярные вопросы наших клиентов
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {[
              {
                question: 'Как быстро приедет водитель?',
                answer: 'Среднее время подачи водителя в пределах города составляет 15-20 минут. В загруженные часы или удалённые районы время может увеличиться до 30-40 минут.'
              },
              {
                question: 'Какие документы нужны для заказа услуги?',
                answer: 'Для услуги трезвого водителя требуется только водительское удостоверение. Для перевозки автомобиля — документы на транспортное средство (СТС или ПТС).'
              },
              {
                question: 'Как рассчитывается стоимость?',
                answer: 'Стоимость услуги трезвого водителя рассчитывается по тарифу за километр + фиксированная подача. Для перевозки — зависит от расстояния, типа транспорта и срочности.'
              },
              {
                question: 'Что делать, если во время поездки что-то случилось?',
                answer: 'Все наши услуги застрахованы. В случае ДТП или повреждений мы полностью берём на себя ответственность. Служба поддержки доступна 24/7.'
              },
              {
                question: 'Можно ли заказать услугу заранее?',
                answer: 'Да, вы можете забронировать водителя или эвакуатор заранее на конкретное время. Это особенно удобно для планируемых мероприятий или переездов.'
              },
              {
                question: 'Работаете ли вы в праздничные дни?',
                answer: 'Мы работаем круглосуточно и без выходных, включая все праздничные дни. В новогодние праздники возможна повышенная загруженность.'
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Заказать услугу</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами в течение 2 минут
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Город</label>
                  <Input
                    placeholder="Москва"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Комментарий (необязательно)</label>
                  <Textarea
                    placeholder="Опишите вашу ситуацию или особые пожелания"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            {[
              {
                icon: 'Phone',
                title: 'Телефон',
                content: '+7 (800) 555-35-35',
                subtitle: 'Звонок бесплатный по России'
              },
              {
                icon: 'Mail',
                title: 'Email',
                content: 'info@trezviyrul.ru',
                subtitle: 'Ответим в течение часа'
              },
              {
                icon: 'Clock',
                title: 'Режим работы',
                content: 'Круглосуточно',
                subtitle: 'Без выходных и праздников'
              }
            ].map((contact, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name={contact.icon} size={32} className="mx-auto mb-3 text-primary" />
                  <div className="font-semibold text-sm text-muted-foreground mb-1">{contact.title}</div>
                  <div className="text-lg font-bold mb-1">{contact.content}</div>
                  <div className="text-sm text-muted-foreground">{contact.subtitle}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}