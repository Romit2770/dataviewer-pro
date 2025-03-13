
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FlaskConical } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define a schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Mock users for demo
const mockUsers: User[] = [
  { id: "user1", email: "scientist@datalab.com", name: "Alex Johnson", role: "Lab Scientist" },
  { id: "user2", email: "admin@datalab.com", name: "Sam Thompson", role: "Lab Administrator" },
  { id: "user3", email: "tech@datalab.com", name: "Jamie Davis", role: "Lab Technician" },
];

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const user = mockUsers.find(user => user.email === values.email);
      
      if (user) {
        // Store user data in localStorage (for demo purposes)
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <AnimatedContainer animation="fade">
        <Card className="w-full max-w-md shadow-lg border-purple-100">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-purple-100 p-3">
                <FlaskConical className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-purple-900">DataLab Login</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email" 
                          {...field} 
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="******" 
                          type="password" 
                          {...field} 
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>Demo accounts:</p>
                  <div className="mt-1 space-y-1">
                    {mockUsers.map(user => (
                      <p key={user.id}>{user.email} - {user.role}</p>
                    ))}
                  </div>
                  <p className="mt-2 text-xs">(Use any password with 6+ characters)</p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default Login;
