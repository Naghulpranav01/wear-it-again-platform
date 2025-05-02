
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLogin } from '@/hooks/useApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Use the login mutation hook
  const { mutate: login, isPending: isLoading } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    login(
      { email, password },
      {
        onSuccess: (userData) => {
          // Store user data in localStorage
          localStorage.setItem('currentUser', JSON.stringify(userData));
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${userData.name}!`
          });
          
          navigate('/');
        },
        onError: (error) => {
          toast({
            title: "Login failed",
            description: error.message || "Invalid email or password. Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <div>
      <Navbar />
      <main className="container max-w-md mx-auto py-12">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-fashion hover:text-fashion-dark">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-fashion hover:bg-fashion-dark"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-fashion hover:text-fashion-dark font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
