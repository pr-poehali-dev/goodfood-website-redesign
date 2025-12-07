import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface PlansPageProps {
  initialTab?: string;
  onViewDetails: (planId: string) => void;
}

export default function PlansPage({ initialTab = 'weight-loss', onViewDetails }: PlansPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const plans = {
    'weight-loss': {
      title: 'Рацион для похудения',
      calories: '~1500 ккал/день',
      emoji: '🥗',
      price: '1290₽',
      oldPrice: '1490₽',
      description: 'Специально разработанный рацион с дефицитом калорий для эффективного снижения веса без вреда для здоровья.',
      macros: {
        protein: '35%',
        fats: '25%',
        carbs: '40%',
      },
      benefits: [
        'Оптимальный дефицит калорий для здорового похудения',
        'Высокое содержание белка для сохранения мышечной массы',
        'Комплекс витаминов и минералов',
        'Низкое содержание быстрых углеводов',
        'Клетчатка для длительного насыщения',
      ],
      menu: [
        { meal: 'Завтрак', items: ['Омлет с овощами', 'Цельнозерновой хлеб', 'Зелёный чай'], time: '7:00-9:00' },
        { meal: 'Перекус', items: ['Греческий йогурт', 'Горсть орехов'], time: '11:00-12:00' },
        { meal: 'Обед', items: ['Куриная грудка на гриле', 'Киноа', 'Свежий салат'], time: '13:00-15:00' },
        { meal: 'Перекус', items: ['Яблоко', 'Творог 2%'], time: '16:00-17:00' },
        { meal: 'Ужин', items: ['Запечённая рыба', 'Тушёные овощи'], time: '18:00-20:00' },
      ],
    },
    'maintenance': {
      title: 'Рацион для поддержания',
      calories: '~2500 ккал/день',
      emoji: '🍱',
      price: '1790₽',
      oldPrice: '1990₽',
      description: 'Сбалансированный рацион для поддержания текущего веса и обеспечения организма всеми необходимыми питательными веществами.',
      macros: {
        protein: '30%',
        fats: '30%',
        carbs: '40%',
      },
      benefits: [
        'Идеальный баланс белков, жиров и углеводов',
        'Разнообразное меню на каждый день',
        'Поддержка энергии в течение дня',
        'Все необходимые микроэлементы',
        'Оптимально для активного образа жизни',
      ],
      menu: [
        { meal: 'Завтрак', items: ['Овсяная каша с ягодами', 'Яйца', 'Тост с авокадо'], time: '7:00-9:00' },
        { meal: 'Перекус', items: ['Протеиновый батончик', 'Фрукты'], time: '11:00-12:00' },
        { meal: 'Обед', items: ['Говядина на гриле', 'Бурый рис', 'Овощной салат', 'Суп'], time: '13:00-15:00' },
        { meal: 'Перекус', items: ['Смузи', 'Цельнозерновые хлебцы'], time: '16:00-17:00' },
        { meal: 'Ужин', items: ['Курица терияки', 'Киноа', 'Овощи на пару'], time: '18:00-20:00' },
      ],
    },
    'mass-gain': {
      title: 'Рацион для набора массы',
      calories: '~3000 ккал/день',
      emoji: '🍗',
      price: '2090₽',
      oldPrice: '2290₽',
      description: 'Высококалорийный рацион с увеличенным содержанием белка и углеводов для эффективного набора мышечной массы.',
      macros: {
        protein: '35%',
        fats: '25%',
        carbs: '40%',
      },
      benefits: [
        'Профицит калорий для роста мышечной массы',
        'Высокое содержание качественного белка',
        'Сложные углеводы для энергии на тренировках',
        'Здоровые жиры для гормонального баланса',
        'Увеличенные порции для набора веса',
      ],
      menu: [
        { meal: 'Завтрак', items: ['Омлет из 4 яиц', 'Овсянка с бананом', 'Цельнозерновой хлеб'], time: '7:00-9:00' },
        { meal: 'Перекус', items: ['Протеиновый коктейль', 'Орехи', 'Сухофрукты'], time: '11:00-12:00' },
        { meal: 'Обед', items: ['Стейк из говядины', 'Картофель', 'Макароны', 'Овощи', 'Суп'], time: '13:00-15:00' },
        { meal: 'Перекус', items: ['Творог с медом', 'Банан', 'Арахисовая паста'], time: '16:00-17:00' },
        { meal: 'Ужин', items: ['Лосось на гриле', 'Бурый рис', 'Овощной салат', 'Авокадо'], time: '18:00-20:00' },
        { meal: 'Поздний перекус', items: ['Казеиновый протеин', 'Творог'], time: '21:00-22:00' },
      ],
    },
  };

  const currentPlan = plans[activeTab as keyof typeof plans];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
            Наши рационы
          </h1>
          <p className="text-xl text-gray-600">
            Выбери рацион под свою цель
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 h-auto bg-transparent mb-8">
            <TabsTrigger 
              value="weight-loss" 
              className="py-4 px-6 text-base data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <span className="mr-2">🥗</span>
              ПОХУДЕНИЕ (~1500 ккал)
            </TabsTrigger>
            <TabsTrigger 
              value="maintenance"
              className="py-4 px-6 text-base data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <span className="mr-2">🍱</span>
              ПОДДЕРЖАНИЕ (~2500 ккал)
            </TabsTrigger>
            <TabsTrigger 
              value="mass-gain"
              className="py-4 px-6 text-base data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <span className="mr-2">🍗</span>
              НАБОР МАССЫ (~3000 ккал)
            </TabsTrigger>
          </TabsList>

          {Object.entries(plans).map(([key, plan]) => (
            <TabsContent key={key} value={key} className="space-y-8 animate-fade-in">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-6xl">{plan.emoji}</span>
                        <div>
                          <h2 className="text-3xl font-bold font-heading text-gray-900">
                            {plan.title}
                          </h2>
                          <p className="text-xl text-gray-600">{plan.calories}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg">{plan.description}</p>
                    </div>
                    
                    <div className="text-center md:text-right">
                      <div className="text-sm text-gray-500 line-through mb-1">
                        {plan.oldPrice}/неделя
                      </div>
                      <div className="text-5xl font-bold text-primary mb-1">
                        {plan.price}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">/неделя</div>
                      <Button size="lg" className="w-full md:w-auto">
                        Заказать рацион
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{plan.macros.protein}</div>
                      <div className="text-sm text-gray-600">Белки</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{plan.macros.fats}</div>
                      <div className="text-sm text-gray-600">Жиры</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{plan.macros.carbs}</div>
                      <div className="text-sm text-gray-600">Углеводы</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                      Преимущества
                    </h3>
                    <Button 
                      size="lg" 
                      className="w-full mb-6"
                      onClick={() => onViewDetails(key)}
                    >
                      Подробнее о рационе
                    </Button>
                    <ul className="space-y-4">
                      {plan.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Icon name="Check" size={24} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                      Пример меню на день
                    </h3>
                    <div className="space-y-4">
                      {plan.menu.map((item, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900">{item.meal}</h4>
                            <span className="text-sm text-gray-500">{item.time}</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {item.items.map((food, idx) => (
                              <li key={idx}>• {food}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}