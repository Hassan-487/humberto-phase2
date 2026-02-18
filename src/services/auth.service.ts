




import apiClient, { setToken, removeToken } from "./apiClient";
import { AUTH_API } from "@/api/auth.api";

export type UserRole = "admin" | "support" | "driver";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    resetToken: string;
  };
}

export interface DashboardSummary {
  trips: {
    total: number;
    active: number;
    scheduled: number;
  };
  drivers: {
    total: number;
    available: number;
  };
  trucks: {
    total: number;
    available: number;
  };
}

export interface DashboardAlertApi {
  id: string;
  type: string;
  message: string;
  severity: string;
  status: string;
  truck: { number: string };
  driver: { name: string };
  detectedAt: string;
}

export interface DashboardTripApi {
  id: string;
  tripNumber: string;
  origin: string;
  destination: string;
  status: string;
  driver: { name: string };
  estimatedArrival: string;
}

export interface DashboardPayload {
  summary: DashboardSummary;
  alerts: {
    criticalCount: number;
    critical: DashboardAlertApi[];
  };
  activeTrips: {
    count: number;
    trips: DashboardTripApi[];
  };
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  dashboard?: DashboardPayload; // For admin/support
  driverDashboard?: any; // For drivers
}

export const authService = {
  /**
   * Login user and return complete response for context to handle
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      AUTH_API.LOGIN,
      credentials
    );

    const { accessToken, refreshToken, user, dashboard, driverDashboard } = response.data;

    // Store tokens
    setToken(accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    // Store user data
    localStorage.setItem("user", JSON.stringify(user));

    // Store dashboard data based on role
    if (user.role === 'driver' && driverDashboard) {
      localStorage.setItem("driverDashboard", JSON.stringify(driverDashboard));
    } else if (dashboard) {
      localStorage.setItem("dashboard", JSON.stringify(dashboard));
    }

    // Return full response so AuthContext can handle user storage
    return response.data;
  },

  /**
   * Logout user (single session)
   */
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await apiClient.post(AUTH_API.LOGOUT, { refreshToken });
      }
    } finally {
      removeToken();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("dashboard");
      localStorage.removeItem("driverDashboard");
      localStorage.removeItem("driver");
      localStorage.removeItem("user");
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const response = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
    }>(AUTH_API.REFRESH, { refreshToken });

    setToken(response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  },

  /**
   * Check auth state (cheap check)
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("fleetpro_auth_token");
  },

  /**
   * Get current user profile from localStorage or API
   */
  async getProfile(): Promise<AuthUser> {
    // First try to get from localStorage (faster, no API call)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }

    // Fallback to API call if not in localStorage
    const response = await apiClient.get<{ user: AuthUser }>(AUTH_API.ME);
    const user = response.data.user;
    
    // Store for future use
    localStorage.setItem("user", JSON.stringify(user));
    
    return user;
  },

  
 /**
 * Forgot password
 */
async forgotPassword(email: string): Promise<void> {
  await apiClient.post(AUTH_API.FORGOT_PASSWORD, { email });
},

/**
 * Verify OTP → returns resetToken
 */
async verifyOtp(email: string, otp: string): Promise<string> {
  const res = await apiClient.post<VerifyOtpResponse>(
    AUTH_API.VERIFY_OTP,
    { email, otp }
  );

  return res.data.data.resetToken;
},

/**
 * Reset password using resetToken
 */
async resetPassword(
  resetToken: string,
  newPassword: string
): Promise<void> {
  await apiClient.post(AUTH_API.RESET_PASSWORD, {
    resetToken,
    newPassword,
  });
}

};