
import React from 'react';
import { Link } from 'react-router-dom';
import { ClothingItem } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: ClothingItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="hover-scale group"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute top-4 right-4 bg-fashion text-white text-xs font-medium px-2 py-1 rounded-full">
            From ${product.rentalPeriods[0].price}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{product.brand}</h3>
          <h4 className="font-serif font-bold text-lg mb-1">{product.name}</h4>
          <p className="text-sm text-muted-foreground">
            Rental: ${product.rentalPeriods[0].price} / {product.rentalPeriods[0].days} days
          </p>
          <div className="mt-2 flex gap-1">
            {product.sizes.map((size) => (
              <span 
                key={size}
                className={cn(
                  "inline-block px-2 py-1 text-xs font-medium rounded-full",
                  product.availableSizes.includes(size) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground opacity-50"
                )}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
