import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const plans = [
    {
      id: 'weight-loss',
      title: 'Похудение',
      price: '1290₽',
      oldPrice: '1490₽',
      description: '~1500 ккал/день',
      emoji: '🥗',
      features: ['Дефицит калорий', 'Высокое содержание белка', 'Минимум углеводов'],
    },
    {
      id: 'maintenance',
      title: 'Поддержание',
      price: '1790₽',
      oldPrice: '1990₽',
      description: '~2500 ккал/день',
      emoji: '🍱',
      features: ['Сбалансированный рацион', 'Оптимальные пропорции КБЖУ', 'Разнообразное меню'],
    },
    {
      id: 'mass-gain',
      title: 'Набор массы',
      price: '2090₽',
      oldPrice: '2290₽',
      description: '~3000 ккал/день',
      emoji: '🍗',
      features: ['Профицит калорий', 'Много белка и углеводов', 'Для роста мышц'],
    },
  ];

  const benefits = [
    {
      icon: '🧠',
      title: 'Полная прозрачность',
      description: 'Полные раскладки КБЖУ и объяснение пользы каждого ингредиента',
    },
    {
      icon: '⚡',
      title: 'Для твоих целей',
      description: 'Рационы для похудения, поддержания веса и набора массы',
    },
    {
      icon: '🚚',
      title: 'Удобство',
      description: 'Доставка готовых блюд прямо к вашей двери по расписанию',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Выбери рацион',
      description: 'Определи свою цель: похудение, поддержание или набор массы',
    },
    {
      number: '2',
      title: 'Заполни заявку',
      description: 'Укажи адрес доставки и удобное время',
    },
    {
      number: '3',
      title: 'Оплати заказ',
      description: 'Безопасная оплата через Telegram',
    },
    {
      number: '4',
      title: 'Получи и наслаждайся',
      description: 'Получай готовые блюда и достигай своих целей',
    },
  ];

  const scrollToPlans = () => {
    const element = document.getElementById('plans-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-gray-900">
              GOODFOOD — умное топливо для твоего тела
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Полные раскладки КБЖУ, объяснение пользы каждого ингредиента
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 mt-8 hover:scale-105 transition-transform"
              onClick={scrollToPlans}
            >
              Выбрать рацион
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-5xl">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="plans-section" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
              Выбери свой рацион
            </h2>
            <p className="text-xl text-gray-600">
              Каждый рацион разработан профессиональными диетологами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary hover:shadow-2xl transition-all duration-300 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-primary/10 to-secondary/5 p-8 text-center">
                  <div className="text-6xl mb-4">{plan.emoji}</div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 line-through">{plan.oldPrice}/неделя</div>
                    <div className="text-4xl font-bold text-primary">{plan.price}</div>
                    <div className="text-sm text-gray-600">/неделя</div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => onNavigate('plan-detail', plan.id)}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
              Как это работает?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold font-heading">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => onNavigate('how-it-works')}
              variant="outline"
              className="px-8"
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}