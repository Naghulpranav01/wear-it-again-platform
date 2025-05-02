
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const categories = [
  {
    title: "Dresses",
    subcategories: ["Casual", "Formal", "Party", "Wedding Guest"]
  },
  {
    title: "Tops",
    subcategories: ["Blouses", "T-shirts", "Sweaters", "Cardigans"]
  },
  {
    title: "Bottoms",
    subcategories: ["Pants", "Skirts", "Jeans", "Shorts"]
  },
  {
    title: "Outerwear",
    subcategories: ["Jackets", "Coats", "Blazers"]
  },
];

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((category) => (
          <NavigationMenuItem key={category.title}>
            <NavigationMenuTrigger className="bg-transparent">
              {category.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[200px]">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={`/catalog?category=${category.title.toLowerCase()}&subcategory=${subcategory.toLowerCase()}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{subcategory}</div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold">
            Wear<span className="text-fashion">It</span>Again
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              <NavigationMenuDemo />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b p-4 animate-fade-in">
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.title} className="space-y-2">
                <h3 className="font-medium">{category.title}</h3>
                <ul className="ml-4 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <Link 
                        to={`/catalog?category=${category.title.toLowerCase()}&subcategory=${subcategory.toLowerCase()}`}
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
