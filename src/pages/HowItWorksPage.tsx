import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HowItWorksPageProps {
  onNavigate: (page: string) => void;
}

export default function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const steps = [
    {
      number: '1',
      title: 'Выбери рацион',
      description: 'Определи свою цель: хочешь похудеть, поддерживать вес или набрать мышечную массу. Мы предлагаем три специально разработанных рациона под каждую задачу.',
      icon: 'Target',
      details: [
        'Рацион для похудения (~1500 ккал)',
        'Рацион для поддержания (~2500 ккал)',
        'Рацион для набора массы (~3000 ккал)',
      ],
    },
    {
      number: '2',
      title: 'Заполни заявку',
      description: 'Укажи адрес доставки, удобное время и количество дней. Минимальный заказ - 5 дней, максимальный - 30 дней.',
      icon: 'FileText',
      details: [
        'Адрес доставки в пределах города',
        'Удобное время доставки (утро/вечер)',
        'Количество дней (от 5 до 30)',
      ],
    },
    {
      number: '3',
      title: 'Оплати заказ',
      description: 'Безопасная оплата через Telegram. Принимаем карты, переводы и электронные кошельки. После оплаты вы получите подтверждение и трек-номер.',
      icon: 'CreditCard',
      details: [
        'Оплата картой через Telegram',
        'Банковский перевод',
        'Электронные кошельки',
      ],
    },
    {
      number: '4',
      title: 'Получи и наслаждайся',
      description: 'Курьер привезёт готовые блюда в удобное время. Все блюда упакованы в контейнеры с указанием КБЖУ и времени приёма пищи.',
      icon: 'Package',
      details: [
        'Доставка в указанное время',
        'Контейнеры с маркировкой КБЖУ',
        'Инструкции по хранению и разогреву',
      ],
    },
  ];

  const features = [
    {
      icon: 'Calculator',
      title: 'Точный расчёт КБЖУ',
      description: 'Каждое блюдо имеет точный расчёт калорий, белков, жиров и углеводов',
    },
    {
      icon: 'Leaf',
      title: 'Свежие продукты',
      description: 'Используем только свежие и качественные ингредиенты от проверенных поставщиков',
    },
    {
      icon: 'Clock',
      title: 'Экономия времени',
      description: 'Не нужно тратить время на покупки, готовку и подсчёт калорий',
    },
    {
      icon: 'Users',
      title: 'Команда профессионалов',
      description: 'Меню разрабатывают дипломированные диетологи и повара',
    },
    {
      icon: 'Truck',
      title: 'Быстрая доставка',
      description: 'Доставим в удобное для вас время по всему городу',
    },
    {
      icon: 'Shield',
      title: 'Контроль качества',
      description: 'Строгий контроль на всех этапах приготовления и упаковки',
    },
  ];

  const faq = [
    {
      question: 'Как хранить готовые блюда?',
      answer: 'Блюда хранятся в холодильнике при температуре +2...+6°C до 3 дней. Каждый контейнер имеет дату приготовления и срок хранения.',
    },
    {
      question: 'Можно ли изменить рацион?',
      answer: 'Да, вы можете изменить рацион или сделать паузу в доставке за 2 дня до следующей поставки.',
    },
    {
      question: 'Что если мне не понравится?',
      answer: 'Если вы не удовлетворены качеством, мы вернём деньги за неиспользованные дни или заменим блюда.',
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
            Как это работает?
          </h1>
          <p className="text-xl text-gray-600">
            Всего 4 простых шага до вашей цели
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto mb-16">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold font-heading">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name={step.icon} size={28} className="text-primary" />
                      <h3 className="text-2xl font-bold font-heading text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 text-center mb-12">
            Почему выбирают нас?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <Card key={index} className="border-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
            Готовы начать?
          </h2>
          <Button 
            size="lg" 
            className="px-8"
            onClick={() => onNavigate('plans')}
          >
            Выбрать рацион
          </Button>
        </div>
      </div>
    </div>
  );
}
