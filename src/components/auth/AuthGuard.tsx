
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredAccessLevel?: "handler" | "worker" | "member";
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requiredAccessLevel 
}) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  // Check authentication status and access level
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem("currentUser");
      
      if (!currentUser) {
        setIsAuthenticated(false);
        setHasAccess(false);
        return;
      }
      
      setIsAuthenticated(true);
      
      if (!requiredAccessLevel) {
        // No specific access level required, grant access
        setHasAccess(true);
        return;
      }
      
      // Check if user has required access level
      const user = JSON.parse(currentUser);
      const accessLevel = user.accessLevel;
      
      if (requiredAccessLevel === "handler") {
        // Only handlers have access
        setHasAccess(accessLevel === "handler");
      } else if (requiredAccessLevel === "worker") {
        // Handlers and workers have access
        setHasAccess(accessLevel === "handler" || accessLevel === "worker");
      } else {
        // Everyone has access to member-level resources
        setHasAccess(true);
      }
    };

    checkAuth();
  }, [requiredAccessLevel]);

  // Still checking auth status
  if (isAuthenticated === null || hasAccess === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Authenticated but doesn't have required access level
  if (!hasAccess) {
    return <Navigate to="/dashboard" state={{ 
      accessDenied: true, 
      requiredLevel: requiredAccessLevel 
    }} replace />;
  }

  // Authenticated with proper access, render the children
  return <>{children}</>;
};

export default AuthGuard;
