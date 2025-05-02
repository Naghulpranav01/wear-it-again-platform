
export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  rentalPeriods: { days: number; price: number }[];
  sizes: string[];
  availableSizes: string[];
  images: string[];
  description: string;
  featured: boolean;
}

export const mockClothingItems: ClothingItem[] = [
  {
    id: "1",
    name: "Floral Midi Dress",
    brand: "Reformation",
    category: "dresses",
    subcategory: "casual",
    price: 250,
    rentalPeriods: [
      { days: 4, price: 45 },
      { days: 7, price: 70 },
      { days: 14, price: 120 }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "A beautiful floral midi dress perfect for summer occasions. Made from 100% sustainable cotton.",
    featured: true
  },
  {
    id: "2",
    name: "Classic Black Blazer",
    brand: "Theory",
    category: "outerwear",
    subcategory: "blazers",
    price: 495,
    rentalPeriods: [
      { days: 4, price: 75 },
      { days: 7, price: 120 },
      { days: 14, price: 200 }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["XS", "S", "M", "XL"],
    images: [
      "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "A timeless black blazer that elevates any outfit. Perfect for professional settings or evening events.",
    featured: true
  },
  {
    id: "3",
    name: "Silk Evening Gown",
    brand: "Marchesa",
    category: "dresses",
    subcategory: "formal",
    price: 1200,
    rentalPeriods: [
      { days: 4, price: 180 },
      { days: 7, price: 250 },
      { days: 14, price: 400 }
    ],
    sizes: ["XS", "S", "M", "L"],
    availableSizes: ["S", "M"],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "An elegant silk evening gown with intricate beading. Perfect for galas and formal events.",
    featured: true
  },
  {
    id: "4",
    name: "Designer Denim Jeans",
    brand: "Citizens of Humanity",
    category: "bottoms",
    subcategory: "jeans",
    price: 225,
    rentalPeriods: [
      { days: 4, price: 40 },
      { days: 7, price: 65 },
      { days: 14, price: 110 }
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
    availableSizes: ["25", "26", "27", "29", "30"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "Premium denim jeans with the perfect fit. These designer jeans look great with everything.",
    featured: false
  },
  {
    id: "5",
    name: "Cashmere Sweater",
    brand: "Vince",
    category: "tops",
    subcategory: "sweaters",
    price: 320,
    rentalPeriods: [
      { days: 4, price: 55 },
      { days: 7, price: 90 },
      { days: 14, price: 150 }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "Ultra-soft 100% cashmere sweater. Luxuriously comfortable for everyday wear or special occasions.",
    featured: false
  },
  {
    id: "6",
    name: "Designer Cocktail Dress",
    brand: "Zimmermann",
    category: "dresses",
    subcategory: "party",
    price: 650,
    rentalPeriods: [
      { days: 4, price: 95 },
      { days: 7, price: 150 },
      { days: 14, price: 250 }
    ],
    sizes: ["0", "2", "4", "6", "8", "10"],
    availableSizes: ["2", "4", "6"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "A stunning designer cocktail dress perfect for parties and special occasions.",
    featured: true
  },
  {
    id: "7",
    name: "Leather Moto Jacket",
    brand: "AllSaints",
    category: "outerwear",
    subcategory: "jackets",
    price: 450,
    rentalPeriods: [
      { days: 4, price: 70 },
      { days: 7, price: 115 },
      { days: 14, price: 190 }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "Classic leather moto jacket with asymmetrical zip closure. Edgy and versatile for any season.",
    featured: false
  },
  {
    id: "8",
    name: "Printed Silk Blouse",
    brand: "Equipment",
    category: "tops",
    subcategory: "blouses",
    price: 280,
    rentalPeriods: [
      { days: 4, price: 45 },
      { days: 7, price: 70 },
      { days: 14, price: 120 }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["XS", "S", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    description: "Luxurious silk blouse with a unique print. Versatile piece that transitions from day to night.",
    featured: false
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123"
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  }
];

export interface RentalOrder {
  id: string;
  userId: string;
  items: {
    itemId: string;
    size: string;
    rentalPeriod: { days: number; price: number };
    startDate: string;
    endDate: string;
  }[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  total: number;
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const mockRentalOrders: RentalOrder[] = [
  {
    id: "order1",
    userId: "1",
    items: [
      {
        itemId: "1",
        size: "M",
        rentalPeriod: { days: 7, price: 70 },
        startDate: "2024-05-10",
        endDate: "2024-05-17"
      },
      {
        itemId: "2",
        size: "S",
        rentalPeriod: { days: 7, price: 120 },
        startDate: "2024-05-10",
        endDate: "2024-05-17"
      }
    ],
    status: 'confirmed',
    total: 190,
    createdAt: "2024-05-01",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    }
  }
];
