import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { plansData } from '@/data/plansData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';

interface PlanDetailPageProps {
  planId: string;
  isAuthenticated: boolean;
  onNavigate: (page: string, planId?: string) => void;
  onAuthRequired: () => void;
}

export default function PlanDetailPage({ planId, isAuthenticated, onNavigate, onAuthRequired }: PlanDetailPageProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const plan = plansData[planId];

  if (!plan) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Рацион не найден</h1>
          <Button onClick={() => onNavigate('plans')}>Вернуться к рационам</Button>
        </div>
      </div>
    );
  }

  const handleOrderClick = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
    } else {
      onNavigate('checkout', planId);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => onNavigate('plans')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к рационам
        </Button>

        <Card className="border-2 border-primary/20 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{plan.emoji}</span>
                  <div>
                    <h1 className="text-4xl font-bold font-heading text-gray-900">
                      {plan.title}
                    </h1>
                    <p className="text-2xl text-gray-600">{plan.calories}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg mb-4">{plan.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-sm py-1">
                    Белки: {plan.macros.protein}
                  </Badge>
                  <Badge variant="secondary" className="text-sm py-1">
                    Жиры: {plan.macros.fats}
                  </Badge>
                  <Badge variant="secondary" className="text-sm py-1">
                    Углеводы: {plan.macros.carbs}
                  </Badge>
                </div>
              </div>

              <div className="text-center md:text-right bg-primary/5 p-6 rounded-lg">
                <div className="text-sm text-gray-500 line-through mb-1">
                  {plan.dailyMenu.oldPricePerWeek}₽/неделя
                </div>
                <div className="text-5xl font-bold text-primary mb-2">
                  {plan.dailyMenu.pricePerWeek}₽
                </div>
                <div className="text-sm text-gray-600 mb-4">/неделя</div>
                <Badge variant="destructive" className="mb-4">
                  Скидка {Math.round(((plan.dailyMenu.oldPricePerWeek - plan.dailyMenu.pricePerWeek) / plan.dailyMenu.oldPricePerWeek) * 100)}%
                </Badge>
                <Button size="lg" className="w-full" onClick={handleOrderClick}>
                  Заказать рацион
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
              Детальное меню на день
            </h2>
            <div className="space-y-6">
              {plan.dailyMenu.meals.map((meal, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{meal.name}</h3>
                        <p className="text-sm text-gray-500">Время приёма: {meal.time}</p>
                      </div>
                      <Badge variant="outline" className="text-lg font-bold">
                        {meal.nutrition.calories} ккал
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Состав:</h4>
                        <ul className="space-y-2">
                          {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">КБЖУ:</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Показатель</TableHead>
                              <TableHead className="text-right">Значение</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Калории</TableCell>
                              <TableCell className="text-right">{meal.nutrition.calories} ккал</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Белки</TableCell>
                              <TableCell className="text-right">{meal.nutrition.protein} г</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Жиры</TableCell>
                              <TableCell className="text-right">{meal.nutrition.fats} г</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Углеводы</TableCell>
                              <TableCell className="text-right">{meal.nutrition.carbs} г</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Icon name="Lightbulb" size={18} className="text-primary" />
                        Польза ингредиентов:
                      </h4>
                      <p className="text-sm text-gray-700">{meal.benefits}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Стоимость продуктов</div>
                        <div className="text-lg font-bold text-gray-700">{meal.productsCost}₽</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Наценка 30%</div>
                        <div className="text-lg font-bold text-gray-700">+{meal.markup.toFixed(1)}₽</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Цена в рационе</div>
                        <div className="text-lg font-bold text-primary">{meal.finalPrice.toFixed(1)}₽</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary mb-8">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
              Итоги дня
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Суммарные КБЖУ за день:</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Калории</TableCell>
                      <TableCell className="text-right text-lg font-bold">{plan.dailyMenu.totalNutrition.calories} ккал</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Белки</TableCell>
                      <TableCell className="text-right text-lg font-bold">{plan.dailyMenu.totalNutrition.protein} г</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Жиры</TableCell>
                      <TableCell className="text-right text-lg font-bold">{plan.dailyMenu.totalNutrition.fats} г</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Углеводы</TableCell>
                      <TableCell className="text-right text-lg font-bold">{plan.dailyMenu.totalNutrition.carbs} г</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Стоимость:</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Общая стоимость продуктов:</span>
                    <span className="font-bold">{plan.dailyMenu.totalProductsCost}₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Наценка 30%:</span>
                    <span className="font-bold">+{plan.dailyMenu.totalMarkup.toFixed(1)}₽</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Цена за день:</span>
                    <span className="font-bold text-xl text-primary">{plan.dailyMenu.pricePerDay.toFixed(1)}₽</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 line-through">Цена за 7 дней (старая):</span>
                      <span className="text-gray-500 line-through">{plan.dailyMenu.oldPricePerWeek}₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Цена за 7 дней со скидкой:</span>
                      <span className="font-bold text-3xl text-primary">{plan.dailyMenu.pricePerWeek}₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-secondary/5 border-2 border-primary">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
              Готовы начать?
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Закажите рацион на неделю и получите скидку {Math.round(((plan.dailyMenu.oldPricePerWeek - plan.dailyMenu.pricePerWeek) / plan.dailyMenu.oldPricePerWeek) * 100)}%!
            </p>
            <Button size="lg" className="text-lg px-12" onClick={handleOrderClick}>
              Заказать этот рацион
            </Button>
          </CardContent>
        </Card>

        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">Требуется авторизация</DialogTitle>
              <DialogDescription className="text-base pt-4">
                Для оформления заказа необходимо войти в систему или зарегистрироваться.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1"
                onClick={() => {
                  setShowAuthDialog(false);
                  onAuthRequired();
                }}
              >
                Войти / Зарегистрироваться
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAuthDialog(false)}
              >
                Отмена
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
