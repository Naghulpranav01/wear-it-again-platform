
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { databaseClothingItems } from '@/data/databaseData';

interface ProductFiltersProps {
  onApplyFilters: (filters: {
    priceRange: [number, number];
    categories: string[];
    sizes: string[];
    brands: string[];
  }) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Get unique categories from database items
  const dbCategories = Array.from(new Set(databaseClothingItems.map(item => item.category)));
  const categories = ["Dresses", "Tops", "Bottoms", "Outerwear", ...dbCategories];
  
  const sizes = ["XS", "S", "M", "L", "XL", "32"];
  
  // Get unique brands/categories from database items
  const dbBrands = Array.from(new Set(databaseClothingItems.map(item => item.category)));
  const brands = ["Reformation", "Theory", "Marchesa", "Citizens of Humanity", "Vince", "Zimmermann", "AllSaints", "Equipment", ...dbBrands];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange: priceRange,
      categories: selectedCategories,
      sizes: selectedSizes,
      brands: selectedBrands
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 250]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    onApplyFilters({
      priceRange: [0, 250],
      categories: [],
      sizes: [],
      brands: []
    });
  };

  // Remove duplicates from arrays
  const uniqueCategories = Array.from(new Set(categories));
  const uniqueBrands = Array.from(new Set(brands));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Price Range (4-day rental)</h3>
        <div className="mb-2">
          <Slider defaultValue={[0, 250]} max={250} step={5} onValueChange={handlePriceChange} value={priceRange} />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {uniqueCategories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedCategories.includes(category)} 
                onCheckedChange={(checked) => handleCategoryChange(category, checked === true)}
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center">
              <Checkbox 
                id={`size-${size}`} 
                checked={selectedSizes.includes(size)} 
                onCheckedChange={(checked) => handleSizeChange(size, checked === true)}
              />
              <label htmlFor={`size-${size}`} className="ml-2 text-sm">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Brands</h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {uniqueBrands.map((brand) => (
            <div key={brand} className="flex items-center">
              <Checkbox 
                id={`brand-${brand}`} 
                checked={selectedBrands.includes(brand)} 
                onCheckedChange={(checked) => handleBrandChange(brand, checked === true)}
              />
              <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApplyFilters} className="flex-1 bg-fashion hover:bg-fashion-dark">
          Apply Filters
        </Button>
        <Button onClick={handleClearFilters} variant="outline" className="flex-1">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
