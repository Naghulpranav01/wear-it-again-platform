
import React from 'react';
import { Link } from 'react-router-dom';
import { mockClothingItems } from '@/data/mockData';
import { cn } from '@/lib/utils';

const FeaturedItems = () => {
  const featuredItems = mockClothingItems.filter((item) => item.featured);

  return (
    <section className="py-16 container">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Items</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our most popular designer pieces available for rent now.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredItems.map((item) => (
          <Link 
            key={item.id}
            to={`/product/${item.id}`}
            className="hover-scale group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-fashion text-white text-xs font-medium px-2 py-1 rounded-full">
                  From ${item.rentalPeriods[0].price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.brand}</h3>
                <h4 className="font-serif font-bold text-lg mb-1">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Rental: ${item.rentalPeriods[0].price} / {item.rentalPeriods[0].days} days
                </p>
                <div className="mt-2 flex gap-1">
                  {item.availableSizes.map((size) => (
                    <span 
                      key={size}
                      className={cn(
                        "inline-block px-2 py-1 text-xs font-medium rounded-full",
                        item.availableSizes.includes(size) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link to="/catalog" className="inline-flex items-center text-fashion hover:text-fashion-dark">
          View All Items
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedItems;
