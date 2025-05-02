
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { mockClothingItems, ClothingItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [displayedItems, setDisplayedItems] = useState<ClothingItem[]>(mockClothingItems);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const initialCategory = searchParams.get('category');
  const initialSubcategory = searchParams.get('subcategory');

  useEffect(() => {
    let filtered = [...mockClothingItems];
    
    if (initialCategory) {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === initialCategory.toLowerCase()
      );
    }
    
    if (initialSubcategory) {
      filtered = filtered.filter(item => 
        item.subcategory.toLowerCase() === initialSubcategory.toLowerCase()
      );
    }
    
    setDisplayedItems(filtered);
  }, [initialCategory, initialSubcategory]);

  const handleApplyFilters = (filters: {
    priceRange: [number, number];
    categories: string[];
    sizes: string[];
    brands: string[];
  }) => {
    let filtered = [...mockClothingItems];
    
    // Filter by price
    filtered = filtered.filter(item => {
      const itemPrice = item.rentalPeriods[0].price;
      return itemPrice >= filters.priceRange[0] && itemPrice <= filters.priceRange[1];
    });
    
    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(item => 
        filters.categories.map(c => c.toLowerCase()).includes(item.category.toLowerCase())
      );
    }
    
    // Filter by sizes
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(item => 
        item.availableSizes.some(size => filters.sizes.includes(size))
      );
    }
    
    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter(item => 
        filters.brands.includes(item.brand)
      );
    }
    
    setDisplayedItems(filtered);
    
    if (isMobile) {
      setShowFilters(false);
    }
  };

  const FiltersComponent = (
    <ProductFilters onApplyFilters={handleApplyFilters} />
  );

  return (
    <div>
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            {initialCategory 
              ? `${initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)} Collection` 
              : "All Items"}
          </h1>
          <p className="text-muted-foreground">
            {displayedItems.length} items available for rent
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          {!isMobile && (
            <div className="col-span-1 hidden lg:block">
              {FiltersComponent}
            </div>
          )}

          {/* Products */}
          <div className="col-span-3">
            {isMobile && (
              <div className="mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter & Sort
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                    </SheetHeader>
                    <div className="pt-4">
                      {FiltersComponent}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}

            {displayedItems.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-xl font-medium mb-2">No items found</h2>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
