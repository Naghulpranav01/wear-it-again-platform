
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { ApiResponse, productsApi, categoriesApi, userApi, cartApi } from '@/services/api';

export const queryClient = new QueryClient();

/**
 * Products hooks
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsApi.getAll();
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productsApi.getById(id);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id
  });
};

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      const response = await productsApi.getByCategory(categoryId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!categoryId
  });
};

/**
 * Categories hooks
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoriesApi.getAll();
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

/**
 * Cart hooks
 */
export const useCart = (userId: string) => {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      const response = await cartApi.getCart(userId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!userId
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async ({ 
      userId, 
      productId, 
      quantity, 
      rentalPeriod 
    }: { 
      userId: string, 
      productId: string, 
      quantity: number, 
      rentalPeriod: string 
    }) => {
      const response = await cartApi.addToCart(userId, productId, quantity, rentalPeriod);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
};

export const useUpdateCartItem = () => {
  return useMutation({
    mutationFn: async ({ 
      cartItemId, 
      quantity 
    }: { 
      cartItemId: string, 
      quantity: number 
    }) => {
      const response = await cartApi.updateCartItem(cartItemId, quantity);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: async (cartItemId: string) => {
      const response = await cartApi.removeFromCart(cartItemId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
};

/**
 * Authentication hooks
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ 
      email, 
      password 
    }: { 
      email: string, 
      password: string 
    }) => {
      const response = await userApi.login(email, password);
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await userApi.register(userData);
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};
