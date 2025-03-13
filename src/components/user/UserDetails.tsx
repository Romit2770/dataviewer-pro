
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface UserDetailProps {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate?: string;
}

const UserDetails: React.FC<UserDetailProps> = ({ 
  id, 
  name, 
  email, 
  role, 
  joinDate = "May 2023" // Default value
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("currentUser");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <Card className="w-full shadow-md border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-50 border-b border-purple-100">
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <User className="h-5 w-5" />
          User Profile
        </CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="bg-purple-100 rounded-full p-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-700">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-muted-foreground text-sm">{id}</p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-muted-foreground">Email:</span>
            <span>{email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-muted-foreground">Role:</span>
            <span>{role}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-muted-foreground">Joined:</span>
            <span>{joinDate}</span>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            variant="outline" 
            className="border-purple-200 hover:bg-purple-50 text-purple-700"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
