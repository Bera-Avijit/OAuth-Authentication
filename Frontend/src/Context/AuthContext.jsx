import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../Services/AuthService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthStatus();
  }, []); // Run once on mount

  const AuthStatus = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      if (userData.authenticated) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loginWithGoogle = () => {
    AuthService.loginWithGoogle();
  };

  const loginWithGitHub = () => {
    AuthService.loginWithGitHub();
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    AuthStatus,
    loginWithGoogle,
    loginWithGitHub,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
