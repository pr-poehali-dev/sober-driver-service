import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
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
  );
}
