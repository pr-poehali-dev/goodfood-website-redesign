import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  createdAt: string;
  planTitle: string;
  planEmoji: string;
  amount: number;
  deliveryDate?: string;
}

interface AccountPageProps {
  userName: string;
}

export default function AccountPage({ userName }: AccountPageProps) {
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'GF-2024-001',
      status: 'delivering',
      createdAt: '2024-12-01',
      planTitle: 'Рацион для похудения',
      planEmoji: '🥗',
      amount: 1290,
      deliveryDate: '2024-12-07',
    },
    {
      id: '2',
      orderNumber: 'GF-2024-002',
      status: 'completed',
      createdAt: '2024-11-20',
      planTitle: 'Рацион для поддержания',
      planEmoji: '🍱',
      amount: 1790,
    },
  ];

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Ожидает оплаты',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: 'Clock',
        };
      case 'preparing':
        return {
          label: 'Готовится',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: 'ChefHat',
        };
      case 'delivering':
        return {
          label: 'В доставке',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: 'Truck',
        };
      case 'completed':
        return {
          label: 'Выполнен',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: 'CheckCircle',
        };
      case 'cancelled':
        return {
          label: 'Отменён',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: 'XCircle',
        };
    }
  };

  const getActionButtons = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return (
          <>
            <Button size="sm" className="flex-1">
              Оплатить
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Отменить
            </Button>
          </>
        );
      case 'preparing':
      case 'delivering':
        return (
          <Button size="sm" variant="outline" className="w-full">
            Отследить заказ
          </Button>
        );
      case 'completed':
        return (
          <>
            <Button size="sm" className="flex-1">
              Повторить заказ
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Оставить отзыв
            </Button>
          </>
        );
      case 'cancelled':
        return (
          <Button size="sm" variant="outline" className="w-full">
            Повторить заказ
          </Button>
        );
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading text-gray-900 mb-2">
            Личный кабинет
          </h1>
          <p className="text-xl text-gray-600">
            Добро пожаловать, {userName}!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Package" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {mockOrders.length}
              </div>
              <div className="text-sm text-gray-600">Всего заказов</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Truck" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {mockOrders.filter(o => o.status === 'delivering' || o.status === 'preparing').length}
              </div>
              <div className="text-sm text-gray-600">Активных заказов</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Star" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-600">Бонусных баллов</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                Мои заказы
              </h2>
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтр
              </Button>
            </div>

            {mockOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  У вас пока нет заказов
                </h3>
                <p className="text-gray-600 mb-6">
                  Выберите рацион и оформите свой первый заказ
                </p>
                <Button>Выбрать рацион</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <Card key={order.id} className="border-2 hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="text-5xl">{order.planEmoji}</div>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                  {order.planTitle}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Заказ #{order.orderNumber}
                                </p>
                              </div>
                              <Badge className={`${statusInfo.color} border`}>
                                <Icon name={statusInfo.icon} size={14} className="mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-gray-500">Дата заказа</div>
                                <div className="font-medium">
                                  {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                                </div>
                              </div>
                              {order.deliveryDate && (
                                <div>
                                  <div className="text-gray-500">Дата доставки</div>
                                  <div className="font-medium">
                                    {new Date(order.deliveryDate).toLocaleDateString('ru-RU')}
                                  </div>
                                </div>
                              )}
                              <div>
                                <div className="text-gray-500">Сумма</div>
                                <div className="font-bold text-primary text-lg">
                                  {order.amount}₽
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              {getActionButtons(order)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="User" size={24} className="text-primary" />
                <h2 className="text-xl font-bold font-heading">Личные данные</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Имя</div>
                  <div className="font-medium">{userName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">user@example.com</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Телефон</div>
                  <div className="font-medium">+7 (900) 123-45-67</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Редактировать
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="MapPin" size={24} className="text-primary" />
                <h2 className="text-xl font-bold font-heading">Адреса доставки</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium mb-1">Основной адрес</div>
                  <div className="text-sm text-gray-600">
                    ул. Примерная, д. 123, кв. 42
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить адрес
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
