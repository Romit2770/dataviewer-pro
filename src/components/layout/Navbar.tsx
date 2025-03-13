
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Database, BarChart3, FlaskConical, Settings, Menu, X, TestTubes, User, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <Database className="h-4 w-4 mr-2" /> },
    { name: "Database", path: "/database", icon: <Server className="h-4 w-4 mr-2" /> },
    { name: "Samples", path: "/samples", icon: <FlaskConical className="h-4 w-4 mr-2" /> },
    { name: "Laboratory", path: "/laboratory", icon: <TestTubes className="h-4 w-4 mr-2" /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-primary font-semibold text-xl">DataLab</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/profile"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/profile"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          )}
        </nav>

        {/* User Avatar */}
        {user && (
          <div className="hidden md:flex items-center gap-2">
            <Link to="/profile">
              <Avatar className="h-8 w-8 border border-border hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 glass border-b border-border/40 animate-fade-in md:hidden">
            <nav className="container flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center text-sm font-medium py-2 transition-colors hover:text-primary",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link
                  to="/profile"
                  className={cn(
                    "flex items-center text-sm font-medium py-2 transition-colors hover:text-primary",
                    location.pathname === "/profile"
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
