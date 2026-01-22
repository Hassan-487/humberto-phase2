
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authService } from "@/services/auth.service";
import type { UserRole } from "@/services/auth.service";

/* ================= TYPES ================= */

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  /**
   * INITIALIZE AUTH (login-only mode)
   * We are NOT restoring session yet
   */
  useEffect(() => {
    setIsLoading(false);
  }, []);

  /**
   * Handle global 401 events from apiClient
   */
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  /**
   * Login
   */
  const login = async (email: string, password: string) => {
    const user = await authService.login({ email, password });
    setUser(user);
  };

  /**
   * Logout
   */
  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("dashboard");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
