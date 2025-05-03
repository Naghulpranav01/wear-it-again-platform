
/**
 * API service for communicating with the MySQL backend
 */

// Use environment variable if available, otherwise fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Define interfaces for your database tables
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location?: string;
  type: string;
  password?: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
}

export interface ClothingItem {
  id: number;
  name: string;
  category: string;
  size: string;
  material: string;
  rental_price: number;
  status: string;
}

export interface Payment {
  id: number;
  date: string;
  status: string;
  method: string;
}

export interface RentalOrder {
  id: number;
  user_id: number;
  item_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
}

export interface Review {
  id: number;
  item_id: number;
  date: string;
  comment: string;
  rating: number;
}

/**
 * Generic fetch function with error handling
 */
async function fetchFromAPI<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        error: data.error || `Error: ${response.status}` 
      };
    }

    return { data: data as T };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Products API
 */
export const productsApi = {
  getAll: async () => {
    return fetchFromAPI<ClothingItem[]>('/clothing_items');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<ClothingItem>(`/clothing_items/${id}`);
  },
  
  getByCategory: async (categoryId: string) => {
    return fetchFromAPI<ClothingItem[]>(`/clothing_items?category=${categoryId}`);
  }
};

/**
 * Categories API
 */
export const categoriesApi = {
  getAll: async () => {
    return fetchFromAPI<any[]>('/categories');
  }
};

/**
 * User API
 */
export const userApi = {
  login: async (email: string, password: string) => {
    return fetchFromAPI<User>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (userData: Partial<User>) => {
    return fetchFromAPI<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  getAll: async () => {
    return fetchFromAPI<User[]>('/users');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<User>(`/users/${id}`);
  },
  
  update: async (id: string, userData: Partial<User>) => {
    return fetchFromAPI<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  delete: async (id: string) => {
    return fetchFromAPI<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }
};

/**
 * Admin API
 */
export const adminApi = {
  login: async (email: string, password: string) => {
    return fetchFromAPI<Admin>('/admins/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  getAll: async () => {
    return fetchFromAPI<Admin[]>('/admins');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<Admin>(`/admins/${id}`);
  }
};

/**
 * Clothing Items API
 */
export const clothingItemsApi = {
  getAll: async () => {
    return fetchFromAPI<ClothingItem[]>('/clothing_items');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<ClothingItem>(`/clothing_items/${id}`);
  },
  
  getByCategory: async (category: string) => {
    return fetchFromAPI<ClothingItem[]>(`/clothing_items?category=${category}`);
  },
  
  create: async (itemData: Partial<ClothingItem>) => {
    return fetchFromAPI<ClothingItem>('/clothing_items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },
  
  update: async (id: string, itemData: Partial<ClothingItem>) => {
    return fetchFromAPI<ClothingItem>(`/clothing_items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },
  
  delete: async (id: string) => {
    return fetchFromAPI<void>(`/clothing_items/${id}`, {
      method: 'DELETE',
    });
  }
};

/**
 * Payment API
 */
export const paymentApi = {
  getAll: async () => {
    return fetchFromAPI<Payment[]>('/payments');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<Payment>(`/payments/${id}`);
  },
  
  create: async (paymentData: Partial<Payment>) => {
    return fetchFromAPI<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }
};

/**
 * Rental Order API
 */
export const rentalOrderApi = {
  getAll: async () => {
    return fetchFromAPI<RentalOrder[]>('/rental_orders');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<RentalOrder>(`/rental_orders/${id}`);
  },
  
  getByUserId: async (userId: string) => {
    return fetchFromAPI<RentalOrder[]>(`/rental_orders?user_id=${userId}`);
  },
  
  create: async (orderData: Partial<RentalOrder>) => {
    return fetchFromAPI<RentalOrder>('/rental_orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
  
  update: async (id: string, orderData: Partial<RentalOrder>) => {
    return fetchFromAPI<RentalOrder>(`/rental_orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  },
  
  delete: async (id: string) => {
    return fetchFromAPI<void>(`/rental_orders/${id}`, {
      method: 'DELETE',
    });
  }
};

/**
 * Review API
 */
export const reviewApi = {
  getAll: async () => {
    return fetchFromAPI<Review[]>('/reviews');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<Review>(`/reviews/${id}`);
  },
  
  getByItemId: async (itemId: string) => {
    return fetchFromAPI<Review[]>(`/reviews?item_id=${itemId}`);
  },
  
  create: async (reviewData: Partial<Review>) => {
    return fetchFromAPI<Review>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
  
  update: async (id: string, reviewData: Partial<Review>) => {
    return fetchFromAPI<Review>(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },
  
  delete: async (id: string) => {
    return fetchFromAPI<void>(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }
};

/**
 * Cart API
 */
export const cartApi = {
  getCart: async (userId: string) => {
    return fetchFromAPI<any>(`/cart/${userId}`);
  },
  
  addToCart: async (userId: string, productId: string, quantity: number, rentalPeriod: string) => {
    return fetchFromAPI<any>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, quantity, rentalPeriod }),
    });
  },
  
  updateCartItem: async (cartItemId: string, quantity: number) => {
    return fetchFromAPI<any>(`/cart/item/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },
  
  removeFromCart: async (cartItemId: string) => {
    return fetchFromAPI<any>(`/cart/item/${cartItemId}`, {
      method: 'DELETE',
    });
  }
};
