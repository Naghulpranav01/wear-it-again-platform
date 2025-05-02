
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">
            Wear<span className="text-fashion">It</span>Again
          </h3>
          <p className="text-muted-foreground mb-4">
            Sustainable fashion for every occasion. Rent designer clothes for a fraction of the cost.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-fashion">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-fashion">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-fashion">
              <span className="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/catalog" className="text-muted-foreground hover:text-fashion">All Items</Link></li>
            <li><Link to="/catalog?category=dresses" className="text-muted-foreground hover:text-fashion">Dresses</Link></li>
            <li><Link to="/catalog?category=tops" className="text-muted-foreground hover:text-fashion">Tops</Link></li>
            <li><Link to="/catalog?category=bottoms" className="text-muted-foreground hover:text-fashion">Bottoms</Link></li>
            <li><Link to="/catalog?category=outerwear" className="text-muted-foreground hover:text-fashion">Outerwear</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Account</h3>
          <ul className="space-y-2">
            <li><Link to="/login" className="text-muted-foreground hover:text-fashion">Sign In</Link></li>
            <li><Link to="/register" className="text-muted-foreground hover:text-fashion">Register</Link></li>
            <li><Link to="/account/orders" className="text-muted-foreground hover:text-fashion">Order History</Link></li>
            <li><Link to="/account/profile" className="text-muted-foreground hover:text-fashion">My Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-muted-foreground hover:text-fashion">About Us</Link></li>
            <li><Link to="/faq" className="text-muted-foreground hover:text-fashion">FAQ</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-fashion">Contact Us</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-fashion">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-fashion">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} WearItAgain. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
