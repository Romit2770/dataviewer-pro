
import React, { useEffect, useState } from "react";
import UserDetails from "@/components/user/UserDetails";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Edit, Eye, Settings } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department?: string;
  accessLevel?: "handler" | "worker" | "member";
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("currentUser");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user found
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <div className="page-container">Loading user profile...</div>;
  }

  const accessLevelDetails = {
    handler: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <Shield className="h-5 w-5 text-green-600" />,
      description: "Full access to read, write, and modify all data. Can manage users and system settings.",
      permissions: [
        { icon: <Eye />, text: "View all data and reports" },
        { icon: <Edit />, text: "Create and edit all records" },
        { icon: <FileText />, text: "Generate and export reports" },
        { icon: <Settings />, text: "Manage system settings and users" }
      ]
    },
    worker: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Edit className="h-5 w-5 text-blue-600" />,
      description: "Can view all data and create or modify own records. Cannot modify other users' data.",
      permissions: [
        { icon: <Eye />, text: "View all data and reports" },
        { icon: <Edit />, text: "Create new records and experiments" },
        { icon: <Edit />, text: "Edit own data entries" },
        { icon: <FileText />, text: "Generate standard reports" }
      ]
    },
    member: {
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <Eye className="h-5 w-5 text-purple-600" />,
      description: "Read-only access to approved data and reports. Cannot modify any data.",
      permissions: [
        { icon: <Eye />, text: "View approved data and reports" },
        { icon: <FileText />, text: "Download approved reports" },
        { icon: <Eye />, text: "View dashboard and statistics" }
      ]
    }
  };

  const accessLevel = user.accessLevel || "member";
  const accessDetails = accessLevelDetails[accessLevel as keyof typeof accessLevelDetails];

  return (
    <div className="page-container">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account information
        </p>
      </div>

      <AnimatedContainer animation="fade">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <UserDetails
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              department={user.department}
            />
          </div>
          <div className="col-span-1">
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <h3 className="text-lg font-medium mb-4">Account Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-purple-100">
                  <span className="text-muted-foreground">Last login</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-purple-100">
                  <span className="text-muted-foreground">Device</span>
                  <span>Web Browser</span>
                </div>
                <div className="flex justify-between py-2 border-b border-purple-100">
                  <span className="text-muted-foreground">Location</span>
                  <span>United States</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Access Level Card */}
          <div className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Access Level</CardTitle>
                  <Badge className={accessDetails.color}>
                    <div className="flex items-center gap-1">
                      {accessDetails.icon}
                      <span className="capitalize">{accessLevel}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{accessDetails.description}</p>
                
                <h4 className="font-medium mb-2">Your Permissions:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {accessDetails.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 bg-background p-2 rounded-md">
                      <div className="text-purple-600 shrink-0">
                        {permission.icon}
                      </div>
                      <span className="text-sm">{permission.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default UserProfile;
