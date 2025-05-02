
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-cover bg-center h-[70vh]" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-start text-white px-4">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
          Rent Designer Fashion for Every Occasion
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          Sustainable, affordable, and always stylish. Why buy when you can rent?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-fashion hover:bg-fashion-dark">
            <Link to="/catalog">Browse Collection</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
            <Link to="/how-it-works">How It Works</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
