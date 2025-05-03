
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useAdmins, 
  useUsers, 
  useClothingItems, 
  useRentalOrders, 
  usePayments 
} from '@/hooks/useApi';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Fetch data
  const { data: admins, isLoading: isLoadingAdmins } = useAdmins();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: clothingItems, isLoading: isLoadingItems } = useClothingItems();
  const { data: rentalOrders, isLoading: isLoadingOrders } = useRentalOrders();
  const { data: payments, isLoading: isLoadingPayments } = usePayments();
  
  useEffect(() => {
    // Check if user is logged in and is an admin
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      
      if (!user.isAdmin) {
        toast({
          title: "Access denied",
          description: "You don't have permission to access this page.",
          variant: "destructive"
        });
        navigate('/');
      }
    } else {
      toast({
        title: "Login required",
        description: "Please log in to access the admin dashboard.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    navigate('/login');
  };

  if (!currentUser?.isAdmin) {
    return <div className="flex justify-center items-center h-screen">Checking permissions...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm">Welcome back, {currentUser.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow rounded-lg p-6">
          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
              <TabsTrigger value="items">Clothing Items</TabsTrigger>
              <TabsTrigger value="orders">Rental Orders</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Users Management</h2>
                <div className="flex justify-between mb-4">
                  <Input 
                    placeholder="Search users..." 
                    className="max-w-xs" 
                  />
                  <Button>Add User</Button>
                </div>
              </div>
              
              {isLoadingUsers ? (
                <div>Loading users...</div>
              ) : (
                <Table>
                  <TableCaption>List of all registered users</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users && users.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            
            <TabsContent value="admins">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Admins Management</h2>
              </div>
              
              {isLoadingAdmins ? (
                <div>Loading admins...</div>
              ) : (
                <Table>
                  <TableCaption>List of all administrators</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins && admins.map((admin: any) => (
                      <TableRow key={admin.id}>
                        <TableCell>{admin.id}</TableCell>
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.role}</TableCell>
                        <TableCell>{admin.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            
            <TabsContent value="items">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Clothing Items</h2>
                <div className="flex justify-between mb-4">
                  <Input 
                    placeholder="Search items..." 
                    className="max-w-xs" 
                  />
                  <Button>Add Item</Button>
                </div>
              </div>
              
              {isLoadingItems ? (
                <div>Loading clothing items...</div>
              ) : (
                <Table>
                  <TableCaption>List of all clothing items</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Material</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clothingItems && clothingItems.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.material}</TableCell>
                        <TableCell>${item.rental_price.toFixed(2)}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Rental Orders</h2>
              </div>
              
              {isLoadingOrders ? (
                <div>Loading rental orders...</div>
              ) : (
                <Table>
                  <TableCaption>List of all rental orders</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Item ID</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentalOrders && rentalOrders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.user_id}</TableCell>
                        <TableCell>{order.item_id}</TableCell>
                        <TableCell>{new Date(order.start_date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(order.end_date).toLocaleDateString()}</TableCell>
                        <TableCell>${order.total_price.toFixed(2)}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            
            <TabsContent value="payments">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Payment History</h2>
              </div>
              
              {isLoadingPayments ? (
                <div>Loading payments...</div>
              ) : (
                <Table>
                  <TableCaption>List of all payments</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments && payments.map((payment: any) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
