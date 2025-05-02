
/**
 * API service for communicating with the MySQL backend
 */

const API_URL = 'http://localhost:5000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
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
    return fetchFromAPI<any[]>('/products');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI<any>(`/products/${id}`);
  },
  
  getByCategory: async (categoryId: string) => {
    return fetchFromAPI<any[]>(`/products?category=${categoryId}`);
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
    return fetchFromAPI<any>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (userData: any) => {
    return fetchFromAPI<any>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
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
