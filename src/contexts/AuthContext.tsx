

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { authService } from "@/services/auth.service";
// import type { UserRole } from "@/services/auth.service";

// /* ================= TYPES ================= */

// export interface AuthUser {
//   id: string;
//   email: string;
//   role: UserRole;
//   firstName?: string;
//   lastName?: string;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: AuthUser | null;
//   isLoading: boolean;
//   isDriver: boolean;
//   isAdmin: boolean;
//   isSupport: boolean;
//   login: (email: string, password: string) => Promise<AuthUser>;
//   logout: () => Promise<void>;
//   setUser: (user: AuthUser | null) => void;
// }

// /* ================= CONTEXT ================= */

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// /* ================= PROVIDER ================= */

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const isAuthenticated = !!user;
//   const isDriver = user?.role === "driver";
//   const isAdmin = user?.role === "admin";
//   const isSupport = user?.role === "support";

//   /**
//    * Initialize auth - check for stored session
//    */
//   useEffect(() => {
//     const initAuth = () => {
//       try {
//         console.log('🔍 Initializing auth...'); // Debug
        
//         // Check for driver session
//         const storedDriver = localStorage.getItem("driver");
//         const token = localStorage.getItem("fleetpro_auth_token");
        
//         console.log('📦 Stored driver:', storedDriver); // Debug
//         console.log('🔑 Token exists:', !!token); // Debug
        
//         if (storedDriver && token) {
//           const parsedDriver = JSON.parse(storedDriver);
//           console.log('👤 Parsed driver:', parsedDriver); // Debug
          
//           if (parsedDriver.role === "driver") {
//             setUser(parsedDriver);
//             console.log('✅ Driver session restored'); // Debug
//             setIsLoading(false);
//             return;
//           }
//         }

//         // Check for admin/support session (if implementing session persistence)
//         // For now, we're not persisting admin sessions
//         console.log('ℹ️ No session to restore'); // Debug
//       } catch (e) {
//         console.error("❌ Failed to restore session", e);
//       }
//       setIsLoading(false);
//     };

//     initAuth();
//   }, []);

//   /**
//    * Handle global 401 events from apiClient
//    */
//   useEffect(() => {
//     const handleUnauthorized = () => {
//       setUser(null);
//       localStorage.removeItem("driver");
//       localStorage.removeItem("dashboard");
//       localStorage.removeItem("driverDashboard");
//     };

//     window.addEventListener("auth:unauthorized", handleUnauthorized);
//     return () =>
//       window.removeEventListener("auth:unauthorized", handleUnauthorized);
//   }, []);

//   /**
//    * Login - returns user for immediate role-based routing
//    */
//   const login = async (email: string, password: string): Promise<AuthUser> => {
//     console.log('🔐 AuthContext: Login attempt for:', email);
    
//     // Call auth service which returns the full response
//     const loginResponse = await authService.login({ email, password });
//     const user = loginResponse.user;
    
//     console.log('✅ AuthContext: Login successful');
//     console.log('👤 AuthContext: User data:', user);
//     console.log('👤 AuthContext: User role:', user.role);
    
//     // Handle driver-specific storage
//     if (user.role === 'driver') {
//       console.log('💾 Storing driver data in localStorage');
//       localStorage.setItem('driver', JSON.stringify(user));
      
//       if (loginResponse.driverDashboard) {
//         console.log('📊 Driver dashboard data already stored by authService');
//       }
//     } else {
//       console.log('💾 Storing admin/support user');
//       localStorage.setItem('user', JSON.stringify(user));
      
//       if (loginResponse.dashboard) {
//         console.log('📊 Dashboard data already stored by authService');
//       }
//     }
    
//     setUser(user);
//     console.log('✅ AuthContext: User state updated');
    
//     return user;
//   };

//   /**
//    * Logout
//    */
//   const logout = async () => {
//     await authService.logout();
//     localStorage.removeItem("dashboard");
//     localStorage.removeItem("driver");
//     localStorage.removeItem("driverDashboard");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         isLoading,
//         isDriver,
//         isAdmin,
//         isSupport,
//         login,
//         logout,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// /* ================= HOOK ================= */

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }



import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { authService, AuthUser } from '@/services/auth.service';
import { getToken, removeToken } from '@/services/apiClient';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to load user profile:', error);
          removeToken();
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setIsAuthenticated(false);
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    const response = await authService.login({ email, password });
    setUser(response.user);
    setIsAuthenticated(true);
    return response.user;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // Don't logout on refresh failure, just keep existing user
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}