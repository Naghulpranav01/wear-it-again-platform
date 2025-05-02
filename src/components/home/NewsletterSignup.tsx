
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, here you would send the email to your API
    console.log("Newsletter signup:", email);
    
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail('');
  };
  
  return (
    <section className="py-16 bg-fashion text-white">
      <div className="container text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Join Our Mailing List</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Subscribe to our newsletter to receive updates on new arrivals, special offers, and styling tips.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black"
          />
          <Button type="submit" className="bg-white text-fashion hover:bg-gray-100">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
