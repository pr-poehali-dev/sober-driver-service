import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { authService, ordersService, Order } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const [orderData, setOrderData] = useState({
    service_type: 'sober_driver' as 'sober_driver' | 'car_transport',
    pickup_address: '',
    destination_address: '',
    pickup_time: '',
    city: '',
    notes: ''
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/');
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    if (!user) return;
    
    try {
      const response = await ordersService.getUserOrders(user.id);
      setOrders(response.orders);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заказы',
        variant: 'destructive'
      });
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await ordersService.createOrder({
        user_id: user.id,
        ...orderData
      });

      toast({
        title: 'Успешно!',
        description: 'Заказ успешно создан'
      });

      setShowOrderForm(false);
      setOrderData({
        service_type: 'sober_driver',
        pickup_address: '',
        destination_address: '',
        pickup_time: '',
        city: '',
        notes: ''
      });
      
      loadOrders();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Ошибка создания заказа',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'Ожидает', color: 'bg-yellow-500' },
      confirmed: { label: 'Подтверждён', color: 'bg-blue-500' },
      in_progress: { label: 'Выполняется', color: 'bg-purple-500' },
      completed: { label: 'Завершён', color: 'bg-green-500' },
      cancelled: { label: 'Отменён', color: 'bg-red-500' }
    };
    
    const badge = badges[status as keyof typeof badges] || badges.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getServiceName = (type: string) => {
    return type === 'sober_driver' ? 'Трезвый водитель' : 'Перевозка авто';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Icon name="Car" size={32} className="text-primary" />
              <span className="text-2xl font-bold">ТрезвыйРуль</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-semibold">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.phone}</div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Личный кабинет</h1>
            <Button size="lg" onClick={() => setShowOrderForm(!showOrderForm)}>
              <Icon name="Plus" size={20} className="mr-2" />
              Создать заказ
            </Button>
          </div>

          {showOrderForm && (
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>Новый заказ</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Тип услуги</label>
                    <Select 
                      value={orderData.service_type} 
                      onValueChange={(value: 'sober_driver' | 'car_transport') => 
                        setOrderData({ ...orderData, service_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sober_driver">Трезвый водитель</SelectItem>
                        <SelectItem value="car_transport">Перевозка авто</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Адрес подачи</label>
                      <Input
                        placeholder="Москва, ул. Ленина 1"
                        value={orderData.pickup_address}
                        onChange={(e) => setOrderData({ ...orderData, pickup_address: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Адрес назначения</label>
                      <Input
                        placeholder="Москва, ул. Пушкина 10"
                        value={orderData.destination_address}
                        onChange={(e) => setOrderData({ ...orderData, destination_address: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Время подачи</label>
                      <Input
                        type="datetime-local"
                        value={orderData.pickup_time}
                        onChange={(e) => setOrderData({ ...orderData, pickup_time: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Город</label>
                      <Input
                        placeholder="Москва"
                        value={orderData.city}
                        onChange={(e) => setOrderData({ ...orderData, city: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Комментарий (необязательно)</label>
                    <Textarea
                      placeholder="Дополнительная информация"
                      value={orderData.notes}
                      onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                          Создание...
                        </>
                      ) : (
                        <>
                          <Icon name="Check" size={20} className="mr-2" />
                          Создать заказ
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowOrderForm(false)}>
                      Отмена
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Мои заказы</h2>
          
          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">У вас пока нет заказов</p>
                <Button className="mt-4" onClick={() => setShowOrderForm(true)}>
                  Создать первый заказ
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{getServiceName(order.service_type)}</h3>
                        <p className="text-sm text-muted-foreground">Заказ #{order.id}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-start gap-2 mb-2">
                          <Icon name="MapPin" size={18} className="text-primary mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">Откуда</div>
                            <div className="text-sm text-muted-foreground">{order.pickup_address}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="MapPin" size={18} className="text-primary mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">Куда</div>
                            <div className="text-sm text-muted-foreground">{order.destination_address}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="Clock" size={18} className="text-primary" />
                          <div className="text-sm">
                            {new Date(order.pickup_time).toLocaleString('ru-RU')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPinned" size={18} className="text-primary" />
                          <div className="text-sm">{order.city}</div>
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="text-sm text-muted-foreground border-t pt-3">
                        <strong>Комментарий:</strong> {order.notes}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mt-3">
                      Создан: {new Date(order.created_at).toLocaleString('ru-RU')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
