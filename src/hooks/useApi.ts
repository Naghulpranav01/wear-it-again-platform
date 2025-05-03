
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { 
  ApiResponse, 
  productsApi, 
  categoriesApi, 
  userApi, 
  cartApi,
  adminApi,
  clothingItemsApi,
  paymentApi,
  rentalOrderApi,
  reviewApi,
  User,
  Admin,
  ClothingItem,
  Payment,
  RentalOrder,
  Review
} from '@/services/api';

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
 * User hooks
 */
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getAll();
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await userApi.getById(id);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ 
      id, 
      userData 
    }: { 
      id: string, 
      userData: Partial<User> 
    }) => {
      const response = await userApi.update(id, userData);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

/**
 * Admin hooks
 */
export const useAdmins = () => {
  return useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const response = await adminApi.getAll();
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useAdmin = (id: string) => {
  return useQuery({
    queryKey: ['admin', id],
    queryFn: async () => {
      const response = await adminApi.getById(id);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async ({ 
      email, 
      password 
    }: { 
      email: string, 
      password: string 
    }) => {
      const response = await adminApi.login(email, password);
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

/**
 * Clothing Items hooks
 */
export const useClothingItems = () => {
  return useQuery({
    queryKey: ['clothingItems'],
    queryFn: async () => {
      const response = await clothingItemsApi.getAll();
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useClothingItem = (id: string) => {
  return useQuery({
    queryKey: ['clothingItem', id],
    queryFn: async () => {
      const response = await clothingItemsApi.getById(id);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id
  });
};

export const useCreateClothingItem = () => {
  return useMutation({
    mutationFn: async (itemData: Partial<ClothingItem>) => {
      const response = await clothingItemsApi.create(itemData);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clothingItems'] });
    }
  });
};

export const useUpdateClothingItem = () => {
  return useMutation({
    mutationFn: async ({ 
      id, 
      itemData 
    }: { 
      id: string, 
      itemData: Partial<ClothingItem> 
    }) => {
      const response = await clothingItemsApi.update(id, itemData);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['clothingItem', id] });
      queryClient.invalidateQueries({ queryKey: ['clothingItems'] });
    }
  });
};

/**
 * Payment hooks
 */
export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await paymentApi.getAll();
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: async (paymentData: Partial<Payment>) => {
      const response = await paymentApi.create(paymentData);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    }
  });
};

/**
 * Rental Order hooks
 */
export const useRentalOrders = () => {
  return useQuery({
    queryKey: ['rentalOrders'],
    queryFn: async () => {
      const response = await rentalOrderApi.getAll();
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useUserRentalOrders = (userId: string) => {
  return useQuery({
    queryKey: ['rentalOrders', 'user', userId],
    queryFn: async () => {
      const response = await rentalOrderApi.getByUserId(userId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!userId
  });
};

export const useCreateRentalOrder = () => {
  return useMutation({
    mutationFn: async (orderData: Partial<RentalOrder>) => {
      const response = await rentalOrderApi.create(orderData);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rentalOrders'] });
      if (data.user_id) {
        queryClient.invalidateQueries({ queryKey: ['rentalOrders', 'user', String(data.user_id)] });
      }
    }
  });
};

/**
 * Review hooks
 */
export const useItemReviews = (itemId: string) => {
  return useQuery({
    queryKey: ['reviews', 'item', itemId],
    queryFn: async () => {
      const response = await reviewApi.getByItemId(itemId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!itemId
  });
};

export const useCreateReview = () => {
  return useMutation({
    mutationFn: async (reviewData: Partial<Review>) => {
      const response = await reviewApi.create(reviewData);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.item_id) {
        queryClient.invalidateQueries({ queryKey: ['reviews', 'item', String(data.item_id)] });
      }
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
    onSuccess: (data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
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
    mutationFn: async (userData: Partial<User>) => {
      const response = await userApi.register(userData);
      if (response.error) throw new Error(response.error);
      return response.data;
    }
  });
};
