
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

// Mock user data with different roles
const mockUsers = [
  { email: "SuhaniReddy@student.nitandhra.ac.in", password: "password123", role: "student" },
  { email: "student2@student.nitandhra.ac.in", password: "password123", role: "student" },
  { email: "faculty1@faculty.nitandhra.ac.in", password: "password123", role: "faculty" },
  { email: "faculty2@faculty.nitandhra.ac.in", password: "password123", role: "faculty" },
  { email: "hod@hod.nitandhra.ac.in", password: "password123", role: "hod" }
];

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find the user in our mock data
    const user = mockUsers.find(user => user.email === email);
    
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      toast.success(`Logged in successfully as ${user.role}`);
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    toast.info("Logged out successfully");
  };

  const value = {
    isAuthenticated,
    userRole,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
