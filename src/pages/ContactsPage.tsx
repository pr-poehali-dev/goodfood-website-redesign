import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ContactsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Сообщение отправлено',
      description: 'Мы свяжемся с вами в ближайшее время!',
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contacts = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '+7 932 059 87 12',
      link: 'tel:+79320598712',
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@goodfood.ru',
      link: 'mailto:info@goodfood.ru',
    },
    {
      icon: 'MapPin',
      title: 'Адрес',
      value: 'г. Москва, ул. Примерная, 123',
      link: '#',
    },
    {
      icon: 'Clock',
      title: 'Время работы',
      value: 'Пн-Вс: 8:00 - 22:00',
      link: '#',
    },
  ];

  const socials = [
    { icon: 'MessageCircle', name: 'Telegram', link: '#' },
    { icon: 'Instagram', name: 'Instagram', link: '#' },
    { icon: 'Facebook', name: 'Facebook', link: '#' },
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
            Контакты
          </h1>
          <p className="text-xl text-gray-600">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <Card className="border-2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                Напишите нам
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (900) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea
                    id="message"
                    placeholder="Ваше сообщение..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  Контактная информация
                </h2>
                <div className="space-y-6">
                  {contacts.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon name={contact.icon} size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{contact.title}</h3>
                        <p className="text-gray-600">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  Мы в соцсетях
                </h2>
                <div className="flex gap-4">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
                      title={social.name}
                    >
                      <Icon name={social.icon} size={24} className="text-primary group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/10 to-secondary/5">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                  Есть вопросы?
                </h3>
                <p className="text-gray-600 mb-4">
                  Позвоните нам прямо сейчас!
                </p>
                <a href="tel:+79320598712">
                  <Button size="lg" className="w-full">
                    +7 932 059 87 12
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-2 max-w-6xl mx-auto">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4 text-center">
              Часто задаваемые вопросы
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Как оформить заказ?</h3>
                <p className="text-sm text-gray-600">
                  Выберите рацион, заполните форму с адресом доставки и оплатите заказ через Telegram.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Какая минимальная сумма заказа?</h3>
                <p className="text-sm text-gray-600">
                  Минимальный заказ составляет 5 дней любого рациона.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Доставляете ли вы за пределы города?</h3>
                <p className="text-sm text-gray-600">
                  На данный момент доставка осуществляется только в пределах города.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Можно ли отменить заказ?</h3>
                <p className="text-sm text-gray-600">
                  Да, вы можете отменить заказ за 24 часа до доставки с полным возвратом средств.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
