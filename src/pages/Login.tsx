
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FlaskConical } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import DemoAccounts from "@/components/auth/DemoAccounts";
import { LoginFormValues, authenticateUser, requestPasswordReset } from "@/services/auth";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotId, setForgotId] = useState("");

  const onSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const user = authenticateUser(values.userId, values.password);
      
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
    const result = requestPasswordReset(forgotId);
    
    if (result.success) {
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
                <LoginForm 
                  onSubmit={onSubmit} 
                  isLoading={isLoading}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <DemoAccounts />
              </CardFooter>
            </>
          ) : (
            <CardContent>
              <ForgotPasswordForm 
                forgotId={forgotId}
                onForgotIdChange={setForgotId}
                onCancel={() => setShowForgotPassword(false)}
                onSubmit={handleForgotPassword}
              />
            </CardContent>
          )}
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default Login;
