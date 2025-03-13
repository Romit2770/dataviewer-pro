
import React, { useEffect, useState } from "react";
import UserDetails from "@/components/user/UserDetails";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
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
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default UserProfile;
