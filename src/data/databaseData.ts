
// Mock data based on MySQL database records provided by the user
export interface DatabaseClothingItem {
  id: number;
  name: string;
  category: string;
  size: string;
  material: string;
  rental_price: number;
  status: string;
}

// Database clothing items from MySQL
export const databaseClothingItems: DatabaseClothingItem[] = [
  { id: 1, name: "Jacket", category: "Winter Wear", size: "L", material: "Wool", rental_price: 170.00, status: "Available" },
  { id: 2, name: "T-shirt", category: "Casual", size: "M", material: "Cotton", rental_price: 100.00, status: "Rented" },
  { id: 3, name: "Jeans", category: "Denim", size: "32", material: "Denim", rental_price: 125.00, status: "Rented" },
  { id: 4, name: "Sweater", category: "Winter Wear", size: "M", material: "Wool", rental_price: 150.00, status: "Rented" },
  { id: 5, name: "Shirt", category: "Formal", size: "L", material: "Linen", rental_price: 170.00, status: "Rented" },
  { id: 6, name: "Dress", category: "Party Wear", size: "S", material: "Silk", rental_price: 200.00, status: "Available" },
  { id: 7, name: "Kurta", category: "Ethnic", size: "M", material: "Cotton", rental_price: 120.00, status: "Available" },
  { id: 8, name: "Shorts", category: "Casual", size: "XL", material: "Polyester", rental_price: 100.00, status: "Rented" },
  { id: 9, name: "Blazer", category: "Formal", size: "L", material: "Wool", rental_price: 250.00, status: "Rented" },
  { id: 10, name: "Tracksuit", category: "Sportswear", size: "M", material: "Polyester", rental_price: 90.00, status: "Available" },
];

// Import the ClothingItem interface from mockData
import { ClothingItem } from './mockData';

// Function to convert database clothing items to the format used by our frontend
export function convertToFrontendFormat(dbItems: DatabaseClothingItem[]): ClothingItem[] {
  return dbItems.map(item => {
    // Generate a placeholder image URL based on category
    let imageUrl = '/placeholder.svg';
    if (item.category === 'Winter Wear') imageUrl = 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=687&auto=format&fit=crop';
    if (item.category === 'Casual') imageUrl = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=764&auto=format&fit=crop';
    if (item.category === 'Denim') imageUrl = 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026&auto=format&fit=crop';
    if (item.category === 'Formal') imageUrl = 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=765&auto=format&fit=crop';
    if (item.category === 'Party Wear') imageUrl = 'https://images.unsplash.com/photo-1612722432474-b971cdcea546?q=80&w=627&auto=format&fit=crop';
    if (item.category === 'Ethnic') imageUrl = 'https://images.unsplash.com/photo-1610189844862-170dd90832df?q=80&w=774&auto=format&fit=crop';
    if (item.category === 'Sportswear') imageUrl = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=720&auto=format&fit=crop';
    
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL'].filter(s => 
      s === item.size || (item.size === '32' && s === 'M')
    );

    return {
      id: item.id.toString(),
      name: item.name,
      brand: item.category,
      description: `Beautiful ${item.name.toLowerCase()} made of ${item.material}. Perfect for any occasion.`,
      category: item.category,
      subcategory: item.material,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      availableSizes: availableSizes,
      images: [imageUrl, imageUrl],
      rentalPeriods: [
        { days: 4, price: item.rental_price },
        { days: 8, price: item.rental_price * 1.8 },
        { days: 16, price: item.rental_price * 3 }
      ],
      price: item.rental_price * 5, // Adding the required price property (estimated retail price)
      featured: item.status === 'Available', // Adding the required featured property, setting it to true for available items
      isAvailable: item.status === 'Available'
    };
  });
}

// Convert the database clothing items to frontend format
export const frontendClothingItems = convertToFrontendFormat(databaseClothingItems);
