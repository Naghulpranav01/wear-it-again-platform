
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { mockClothingItems } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

// Mock cart data
const initialCart = [
  {
    productId: "1",
    size: "M",
    rentalPeriodIndex: 1,
    startDate: "2025-05-15",
    quantity: 1,
  },
  {
    productId: "3",
    size: "S",
    rentalPeriodIndex: 0,
    startDate: "2025-05-15",
    quantity: 1,
  }
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);
  const [subtotal, setSubtotal] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate subtotal
    const total = cart.reduce((acc, item) => {
      const product = mockClothingItems.find(p => p.id === item.productId);
      if (product) {
        return acc + product.rentalPeriods[item.rentalPeriodIndex].price * item.quantity;
      }
      return acc;
    }, 0);
    setSubtotal(total);
  }, [cart]);

  const handleRemoveItem = (productId: string, size: string) => {
    const updatedCart = cart.filter(
      item => !(item.productId === productId && item.size === size)
    );
    setCart(updatedCart);

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity < 1) return;

    const updatedCart = cart.map(item => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <div>
      <Navbar />
      <main className="container py-8">
        <h1 className="font-serif text-3xl font-bold mb-8">Your Rental Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="bg-fashion hover:bg-fashion-dark">
              <Link to="/catalog">Browse Collection</Link>
            </Button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 gap-8">
            <div className="col-span-8">
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Size</th>
                      <th className="text-left p-4">Rental Period</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Quantity</th>
                      <th className="text-left p-4">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cart.map((item) => {
                      const product = mockClothingItems.find(p => p.id === item.productId);
                      if (!product) return null;
                      
                      const rentalPeriod = product.rentalPeriods[item.rentalPeriodIndex];
                      const itemTotal = rentalPeriod.price * item.quantity;
                      
                      return (
                        <tr key={`${item.productId}-${item.size}`}>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="h-16 w-12 rounded overflow-hidden mr-4">
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{item.size}</td>
                          <td className="p-4">{rentalPeriod.days} days</td>
                          <td className="p-4">${rentalPeriod.price}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleUpdateQuantity(item.productId, item.size, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="mx-2">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="p-4 font-medium">${itemTotal}</td>
                          <td className="p-4">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveItem(item.productId, item.size)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-span-4 mt-8 lg:mt-0">
              <div className="rounded-lg border p-6 space-y-6">
                <h2 className="font-serif text-xl font-medium">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-serif font-bold text-lg">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-fashion hover:bg-fashion-dark">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="text-center">
                  <Link to="/catalog" className="text-fashion hover:text-fashion-dark text-sm">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
