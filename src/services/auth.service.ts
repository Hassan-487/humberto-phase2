import apiClient, { setToken, removeToken } from "./apiClient";
import { AUTH_API } from "@/api/auth.api";


export type UserRole =
  | "admin"
  | "support"
  | "driver";

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
}



export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    resetToken: string;
  };
}

// ADD THESE TYPES
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
  dashboard: DashboardPayload; // 🔥 ADD THIS
}



export const authService = {


  async login(credentials: LoginCredentials): Promise<AuthUser> {
  const response = await apiClient.post<LoginResponse>(
    AUTH_API.LOGIN,
    credentials
  );

  const { accessToken, refreshToken, user, dashboard } = response.data;

  setToken(accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  // 🔥 STORE DASHBOARD DATA
  localStorage.setItem("dashboard", JSON.stringify(dashboard));

  return user;
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
   * Forgot password
   */
  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(AUTH_API.FORGOT_PASSWORD, { email });
  },

  /**
   * Verify OTP
   * Updated to correctly map the nested resetToken from your API response
   */
  async verifyOtp(email: string, otp: string): Promise<string> {
    const res = await apiClient.post<VerifyOtpResponse>(
      AUTH_API.VERIFY_OTP,
      { email, otp }
    );
    
    // Accessing the nested path: res.data (Axios) -> .data (Your API) -> .resetToken
    return res.data.data.resetToken;
  },

  /**
   * Reset password
   */
 async resetPassword(email: string, token: string, password: string): Promise<void> {
  
  await apiClient.post(AUTH_API.RESET_PASSWORD, { 
    email: email, verificationToken: token,newPassword: password });
},
};