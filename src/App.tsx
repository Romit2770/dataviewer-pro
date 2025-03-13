
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./pages/Dashboard";
import Database from "./pages/Database";
import Samples from "./pages/Samples";
import SampleDetails from "./pages/SampleDetails";
import Laboratory from "./pages/Laboratory";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AuthGuard from "./components/auth/AuthGuard";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const currentUser = localStorage.getItem("currentUser");
      setIsAuthenticated(!!currentUser);
    };

    checkAuth();
    // Listen for storage events (e.g., logout in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isAuthenticated !== null && (
            <>
              {isAuthenticated && <Navbar />}
              <main className={`${isAuthenticated ? 'flex-1 pb-16' : 'min-h-screen'}`}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected routes with different access levels */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={
                    <AuthGuard requiredAccessLevel="member">
                      <Dashboard />
                    </AuthGuard>
                  } />
                  <Route path="/database" element={
                    <AuthGuard requiredAccessLevel="worker">
                      <Database />
                    </AuthGuard>
                  } />
                  <Route path="/samples" element={
                    <AuthGuard requiredAccessLevel="member">
                      <Samples />
                    </AuthGuard>
                  } />
                  <Route path="/samples/:id" element={
                    <AuthGuard requiredAccessLevel="member">
                      <SampleDetails />
                    </AuthGuard>
                  } />
                  <Route path="/laboratory" element={
                    <AuthGuard requiredAccessLevel="worker">
                      <Laboratory />
                    </AuthGuard>
                  } />
                  <Route path="/reports" element={
                    <AuthGuard requiredAccessLevel="member">
                      <Reports />
                    </AuthGuard>
                  } />
                  <Route path="/settings" element={
                    <AuthGuard requiredAccessLevel="handler">
                      <Settings />
                    </AuthGuard>
                  } />
                  <Route path="/profile" element={
                    <AuthGuard requiredAccessLevel="member">
                      <UserProfile />
                    </AuthGuard>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {isAuthenticated && <Footer />}
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
