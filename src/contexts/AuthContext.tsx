
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