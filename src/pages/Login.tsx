
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FlaskConical, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define a schema for form validation
const formSchema = z.object({
  userId: z.string().min(7, { message: "User ID must be at least 7 characters" })
    .regex(/^\d{2}(hd|wk|mb)\d{3}$/, { 
      message: "ID format should be YYxxNNN (e.g., 25hd001, 25wk002, 25mb003)" 
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  accessLevel: "handler" | "worker" | "member";
  email: string;
}

// Mock users with the new ID format
const mockUsers: User[] = [
  { 
    id: "25hd001", 
    name: "Alex Johnson", 
    role: "Senior Lab Handler", 
    department: "Research",
    accessLevel: "handler",
    email: "alex.johnson@datalab.com" 
  },
  { 
    id: "25wk002", 
    name: "Sam Thompson", 
    role: "Lab Worker", 
    department: "Testing",
    accessLevel: "worker",
    email: "sam.thompson@datalab.com" 
  },
  { 
    id: "25mb003", 
    name: "Jamie Davis", 
    role: "Company Member", 
    department: "Management",
    accessLevel: "member",
    email: "jamie.davis@datalab.com" 
  },
  { 
    id: "25hd004", 
    name: "Morgan Wright", 
    role: "Lab Administrator", 
    department: "Operations",
    accessLevel: "handler",
    email: "morgan.wright@datalab.com" 
  },
  { 
    id: "25wk005", 
    name: "Taylor Lee", 
    role: "Lab Technician", 
    department: "Analysis",
    accessLevel: "worker",
    email: "taylor.lee@datalab.com" 
  },
];

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotId, setForgotId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const user = mockUsers.find(user => user.id === values.userId);
      
      if (user) {
        // Store user data in localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid ID or password. Please try again.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    if (!forgotId.match(/^\d{2}(hd|wk|mb)\d{3}$/)) {
      toast({
        title: "Invalid ID format",
        description: "Please enter a valid ID in the format YYxxNNN (e.g., 25hd001)",
        variant: "destructive",
      });
      return;
    }
    
    const user = mockUsers.find(user => user.id === forgotId);
    
    if (user) {
      toast({
        title: "Password reset request submitted",
        description: "Please contact your handler for password reset. An email has been sent to the administrator.",
      });
    } else {
      toast({
        title: "User not found",
        description: "No user found with this ID. Please check and try again.",
        variant: "destructive",
      });
    }
    
    setShowForgotPassword(false);
    setForgotId("");
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
              Enter your DataLab ID and password to access the system
            </CardDescription>
          </CardHeader>
          
          {!showForgotPassword ? (
            <>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="userId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DataLab ID</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="25xx000" 
                              {...field} 
                              autoComplete="username"
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            Format: YY+role+NNN (e.g., 25hd001)
                          </p>
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
                  </form>
                </Form>
                
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    className="text-sm text-purple-600 hover:text-purple-800"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </Button>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-muted-foreground w-full">
                  <p>Demo accounts:</p>
                  <div className="mt-1 space-y-1">
                    <p><span className="font-medium">25hd001</span> - Handler (Full access)</p>
                    <p><span className="font-medium">25wk002</span> - Worker (Read/Write access)</p>
                    <p><span className="font-medium">25mb003</span> - Member (Read-only access)</p>
                  </div>
                  <p className="mt-2 text-xs">(Use any password with 6+ characters)</p>
                </div>
              </CardFooter>
            </>
          ) : (
            <CardContent>
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <Key className="h-12 w-12 mx-auto text-purple-600 mb-2" />
                  <h3 className="text-lg font-medium">Forgot Your Password?</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your DataLab ID and we'll help you reset your password.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="forgot-id">DataLab ID</Label>
                  <Input 
                    id="forgot-id"
                    placeholder="25xx000" 
                    value={forgotId}
                    onChange={(e) => setForgotId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: YY+role+NNN (e.g., 25hd001)
                  </p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={handleForgotPassword}
                  >
                    Reset Password
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default Login;
