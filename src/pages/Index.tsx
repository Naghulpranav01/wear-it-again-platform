
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedItems from '@/components/home/FeaturedItems';
import HowItWorks from '@/components/home/HowItWorks';
import Categories from '@/components/home/Categories';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSignup from '@/components/home/NewsletterSignup';

const Index = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <FeaturedItems />
        <HowItWorks />
        <Categories />
        <Testimonials />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
