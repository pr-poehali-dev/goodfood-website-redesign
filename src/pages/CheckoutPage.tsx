import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { plansData } from '@/data/plansData';

interface CheckoutPageProps {
  planId: string;
  onNavigate: (page: string) => void;
  userName: string;
}

export default function CheckoutPage({ planId, onNavigate, userName }: CheckoutPageProps) {
  const { toast } = useToast();
  const plan = plansData[planId];

  const [deliveryData, setDeliveryData] = useState({
    address: '',
    entrance: '',
    floor: '',
    apartment: '',
    intercom: '',
    comment: '',
  });

  const [deliveryTime, setDeliveryTime] = useState('morning');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const timeSlots = [
    { value: 'morning', label: 'Утро 08:00-12:00' },
    { value: 'afternoon', label: 'День 12:00-16:00' },
    { value: 'evening', label: 'Вечер 16:00-20:00' },
  ];

  const paymentMethods = [
    {
      value: 'phone-transfer',
      label: 'Перевод по номеру телефона',
      icon: 'Smartphone',
      description: 'Перевод на карту Тинькофф',
    },
    {
      value: 'telegram',
      label: 'Связь в Telegram для оплаты',
      icon: 'MessageCircle',
      description: 'Напишите нам в Telegram',
    },
    {
      value: 'cash',
      label: 'Наличными курьеру',
      icon: 'Wallet',
      description: 'Дополнительная комиссия 100₽',
    },
  ];

  const handleSubmit = () => {
    if (!deliveryData.address || !deliveryTime || !paymentMethod) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmOrder = () => {
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);

    toast({
      title: 'Заказ оформлен',
      description: 'Письмо с деталями заказа отправлено на вашу почту',
    });
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+79320598712');
    toast({
      title: 'Скопировано',
      description: 'Номер телефона скопирован в буфер обмена',
    });
  };

  const openTelegram = () => {
    const message = encodeURIComponent(
      `Здравствуйте! Хочу оформить заказ:\nРацион: ${plan.title}\nСумма: ${plan.dailyMenu.pricePerWeek}₽`
    );
    window.open(`https://t.me/+79320598712?text=${message}`, '_blank');
  };

  if (!plan) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Ошибка</h1>
          <Button onClick={() => onNavigate('plans')}>Вернуться к рационам</Button>
        </div>
      </div>
    );
  }

  const finalPrice = paymentMethod === 'cash' 
    ? plan.dailyMenu.pricePerWeek + 100 
    : plan.dailyMenu.pricePerWeek;

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-8">
          Оформление заказа
        </h1>

        <div className="space-y-6">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="CheckCircle" size={24} className="text-primary" />
                <h2 className="text-2xl font-bold font-heading">Шаг 1: Проверка заказа</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-lg">
                <div className="text-6xl">{plan.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-3">{plan.calories}</p>
                  <Badge variant="secondary">7 дней</Badge>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-sm text-gray-500 line-through mb-1">
                    {plan.dailyMenu.oldPricePerWeek}₽
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {plan.dailyMenu.pricePerWeek}₽
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => onNavigate('plan-detail', planId)}
              >
                Изменить рацион
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="MapPin" size={24} className="text-primary" />
                <h2 className="text-2xl font-bold font-heading">Шаг 2: Данные доставки</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес доставки *</Label>
                  <Input
                    id="address"
                    placeholder="Например: ул. Примерная, 123"
                    value={deliveryData.address}
                    onChange={(e) => setDeliveryData({ ...deliveryData, address: e.target.value })}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    В будущем здесь будет интеграция с Яндекс.Картами
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="entrance">Подъезд</Label>
                    <Input
                      id="entrance"
                      placeholder="1"
                      value={deliveryData.entrance}
                      onChange={(e) => setDeliveryData({ ...deliveryData, entrance: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Этаж</Label>
                    <Input
                      id="floor"
                      type="number"
                      placeholder="5"
                      value={deliveryData.floor}
                      onChange={(e) => setDeliveryData({ ...deliveryData, floor: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Квартира/офис</Label>
                    <Input
                      id="apartment"
                      placeholder="42"
                      value={deliveryData.apartment}
                      onChange={(e) => setDeliveryData({ ...deliveryData, apartment: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="intercom">Домофон</Label>
                    <Input
                      id="intercom"
                      placeholder="42К"
                      value={deliveryData.intercom}
                      onChange={(e) => setDeliveryData({ ...deliveryData, intercom: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Время доставки *</Label>
                  <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime}>
                    {timeSlots.map((slot) => (
                      <div key={slot.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={slot.value} id={slot.value} />
                        <Label htmlFor={slot.value} className="cursor-pointer">
                          {slot.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий курьеру</Label>
                  <Textarea
                    id="comment"
                    placeholder="Например: позвоните за 10 минут до приезда"
                    rows={3}
                    maxLength={200}
                    value={deliveryData.comment}
                    onChange={(e) => setDeliveryData({ ...deliveryData, comment: e.target.value })}
                  />
                  <p className="text-sm text-gray-500 text-right">
                    {deliveryData.comment.length}/200 символов
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="CreditCard" size={24} className="text-primary" />
                <h2 className="text-2xl font-bold font-heading">Шаг 3: Способ оплаты</h2>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.value}>
                      <div className="flex items-start space-x-3 border-2 p-4 rounded-lg hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value={method.value} id={method.value} />
                        <div className="flex-1">
                          <Label htmlFor={method.value} className="cursor-pointer flex items-center gap-2">
                            <Icon name={method.icon} size={20} />
                            <span className="font-bold">{method.label}</span>
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                        </div>
                      </div>

                      {paymentMethod === method.value && (
                        <div className="mt-4 p-4 bg-primary/5 rounded-lg animate-fade-in">
                          {method.value === 'phone-transfer' && (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-bold">Номер для перевода:</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold">+7 932 059 87 12</span>
                                  <Button size="sm" variant="outline" onClick={copyPhoneNumber}>
                                    <Icon name="Copy" size={16} />
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <span className="font-bold">Банк:</span> Тинькофф
                              </div>
                              <div>
                                <span className="font-bold">Получатель:</span> ООО "GOODFOOD"
                              </div>
                              <div>
                                <span className="font-bold">Сумма:</span> {finalPrice}₽
                              </div>
                              <p className="text-sm text-gray-600 mt-4">
                                После оплаты нажмите кнопку "Подтвердить заказ" ниже
                              </p>
                            </div>
                          )}

                          {method.value === 'telegram' && (
                            <div className="text-center space-y-4">
                              <p className="text-gray-700">
                                Нажмите кнопку ниже, чтобы открыть Telegram и обсудить оплату
                              </p>
                              <Button onClick={openTelegram} className="gap-2">
                                <Icon name="MessageCircle" size={20} />
                                Написать в Telegram
                              </Button>
                            </div>
                          )}

                          {method.value === 'cash' && (
                            <div className="space-y-3">
                              <p className="text-gray-700">
                                Вы сможете оплатить наличными при получении заказа от курьера.
                              </p>
                              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                                <div className="flex items-center gap-2 text-yellow-800">
                                  <Icon name="AlertCircle" size={18} />
                                  <span className="font-bold">Дополнительная комиссия: 100₽</span>
                                </div>
                              </div>
                              <div>
                                <span className="font-bold">Итоговая сумма:</span> {finalPrice}₽
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Итого к оплате:</span>
                <span className="text-4xl font-bold text-primary">{finalPrice}₽</span>
              </div>
              <Button size="lg" className="w-full text-lg" onClick={handleSubmit}>
                Подтвердить заказ
              </Button>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">Подтверждение заказа</DialogTitle>
              <DialogDescription className="text-base pt-4">
                Вы уверены, что хотите оформить заказ?
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 py-4 border-t border-b">
              <div className="flex justify-between">
                <span className="text-gray-700">Рацион:</span>
                <span className="font-bold">{plan.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Длительность:</span>
                <span className="font-bold">7 дней</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Адрес:</span>
                <span className="font-bold">{deliveryData.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Время доставки:</span>
                <span className="font-bold">
                  {timeSlots.find(t => t.value === deliveryTime)?.label}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold">Итого:</span>
                <span className="font-bold text-primary">{finalPrice}₽</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1"
                onClick={handleConfirmOrder}
              >
                Да, подтверждаю
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmDialog(false)}
              >
                Отмена
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSuccessDialog} onOpenChange={(open) => {
          setShowSuccessDialog(open);
          if (!open) onNavigate('account');
        }}>
          <DialogContent>
            <DialogHeader>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={40} className="text-primary" />
                </div>
                <DialogTitle className="text-3xl font-heading">Заказ оформлен!</DialogTitle>
              </div>
              <DialogDescription className="text-base text-center pt-2">
                Спасибо за заказ, {userName}! Мы отправили детали заказа на вашу почту.
                Курьер свяжется с вами перед доставкой.
              </DialogDescription>
            </DialogHeader>

            <Button
              className="w-full mt-4"
              onClick={() => {
                setShowSuccessDialog(false);
                onNavigate('account');
              }}
            >
              Перейти к моим заказам
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
