const AUTH_API = 'https://functions.poehali.dev/c838f875-fc66-4270-a9e2-1c658142ee53';
const ORDERS_API = 'https://functions.poehali.dev/0dbca1f2-99cd-4835-8e64-5f3e0378c7bb';

export interface User {
  id: number;
  phone: string;
  name: string;
  email?: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface Order {
  id: number;
  user_id: number;
  service_type: 'sober_driver' | 'car_transport';
  pickup_address: string;
  destination_address: string;
  pickup_time: string;
  city: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const authService = {
  async register(phone: string, name: string, password: string, email?: string): Promise<AuthResponse> {
    const response = await fetch(AUTH_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', phone, name, password, email })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
    
    if (data.success) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  async login(phone: string, password: string): Promise<AuthResponse> {
    const response = await fetch(AUTH_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', phone, password })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    
    if (data.success) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }
};

export const ordersService = {
  async createOrder(orderData: {
    user_id: number;
    service_type: 'sober_driver' | 'car_transport';
    pickup_address: string;
    destination_address: string;
    pickup_time: string;
    city: string;
    notes?: string;
  }) {
    const response = await fetch(ORDERS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create order');
    
    return data;
  },

  async getUserOrders(userId: number): Promise<{ success: boolean; orders: Order[] }> {
    const response = await fetch(`${ORDERS_API}?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch orders');
    
    return data;
  },

  async updateOrderStatus(orderId: number, status: string) {
    const response = await fetch(ORDERS_API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify({ order_id: orderId, status })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update order');
    
    return data;
  }
};
