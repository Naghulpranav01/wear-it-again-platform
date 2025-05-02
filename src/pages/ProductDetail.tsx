
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mockClothingItems } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState(mockClothingItems.find(item => item.id === id));
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!product) {
      navigate('/catalog');
      toast({
        title: "Product not found",
        description: "The product you're looking for doesn't exist.",
        variant: "destructive"
      });
    } else if (product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0]);
    }
  }, [product, navigate, toast]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedRentalPeriod === undefined) {
      toast({
        title: "Please select a rental period",
        description: "You must select a rental period before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, here you would add the item to cart
    toast({
      title: "Added to cart",
      description: `${product?.name} in size ${selectedSize} for ${product?.rentalPeriods[selectedRentalPeriod].days} days.`,
    });
  };
  
  if (!product) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="object-cover w-full h-full" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 border-2 rounded-md overflow-hidden ${
                    idx === currentImageIndex ? 'border-fashion' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-16 h-24 object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-1">{product.brand}</h2>
              <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">
                Retail Price: ${product.price}
              </p>
              <div className="h-1 w-20 bg-fashion my-4"></div>
              <p className="mb-4">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button 
                      key={size}
                      disabled={!product.availableSizes.includes(size)}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${!product.availableSizes.includes(size) 
                          ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed' 
                          : selectedSize === size
                            ? 'bg-fashion text-white'
                            : 'bg-accent hover:bg-accent/80 text-accent-foreground'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rental Period Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rental Period
                </label>
                <div className="flex flex-col gap-2">
                  {product.rentalPeriods.map((period, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedRentalPeriod(idx)}
                      className={`
                        px-4 py-3 border rounded-md text-left transition-colors
                        ${selectedRentalPeriod === idx
                          ? 'border-fashion bg-fashion/10'
                          : 'border-border hover:border-fashion'
                        }
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{period.days} Days</span>
                        <span className="text-lg font-serif font-bold">${period.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart}
                className="w-full py-6 mt-4 bg-fashion hover:bg-fashion-dark text-lg"
              >
                Add to Cart
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger>Product Details</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Brand: {product.brand}</li>
                      <li>Category: {product.category}</li>
                      <li>Subcategory: {product.subcategory}</li>
                      <li>Available Sizes: {product.availableSizes.join(', ')}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Your rental includes:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Free shipping both ways</li>
                      <li>Dry cleaning before and after wear</li>
                      <li>Insurance for minor damages and normal wear</li>
                      <li>Simple return with our prepaid shipping label</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sizing">
                  <AccordionTrigger>Sizing Guide</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Our items are true to size. For specific measurements, please refer to the size chart below:
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Size</th>
                          <th className="text-left py-2">Bust</th>
                          <th className="text-left py-2">Waist</th>
                          <th className="text-left py-2">Hip</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">XS</td>
                          <td className="py-2">32"</td>
                          <td className="py-2">24"-25"</td>
                          <td className="py-2">34"-35"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">S</td>
                          <td className="py-2">34"-35"</td>
                          <td className="py-2">26"-27"</td>
                          <td className="py-2">36"-37"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">M</td>
                          <td className="py-2">36"-37"</td>
                          <td className="py-2">28"-29"</td>
                          <td className="py-2">38"-39"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">L</td>
                          <td className="py-2">38"-39"</td>
                          <td className="py-2">30"-31"</td>
                          <td className="py-2">40"-41"</td>
                        </tr>
                      </tbody>
                    </table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
