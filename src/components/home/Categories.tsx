
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: "dresses",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 24
  },
  {
    id: "tops",
    name: "Tops",
    image: "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 36
  },
  {
    id: "bottoms",
    name: "Bottoms",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 18
  },
  {
    id: "outerwear",
    name: "Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 12
  }
];

const Categories = () => {
  return (
    <section className="py-16 container">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our collection by category to find exactly what you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/catalog?category=${category.id}`}
            className="hover-scale group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-square w-full">
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="font-serif text-2xl font-bold">{category.name}</h3>
                <p className="text-sm font-medium">{category.count} Items</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
