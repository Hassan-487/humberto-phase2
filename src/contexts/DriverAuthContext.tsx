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

// export interface DriverUser {
//   id: string;
//   email: string;
//   role: "driver";
//   firstName?: string;
//   lastName?: string;
// }

// interface DriverAuthContextType {
//   isAuthenticated: boolean;
//   driver: DriverUser | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// /* ================= CONTEXT ================= */

// const DriverAuthContext = createContext<DriverAuthContextType | undefined>(
//   undefined
// );

// /* ================= PROVIDER ================= */

// export function DriverAuthProvider({ children }: { children: ReactNode }) {
//   const [driver, setDriver] = useState<DriverUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const isAuthenticated = !!driver;

//   useEffect(() => {
//     setIsLoading(false);
//   }, []);

//   /**
//    * Handle global 401 (driver only)
//    */
//   useEffect(() => {
//     const handleUnauthorized = () => {
//       setDriver(null);
//       localStorage.removeItem("dashboard");
//     };

//     window.addEventListener("driver:unauthorized", handleUnauthorized);
//     return () =>
//       window.removeEventListener("driver:unauthorized", handleUnauthorized);
//   }, []);

//   /**
//    * Driver Login
//    */
//   const login = async (email: string, password: string) => {
//     const user = await authService.login({ email, password });

//     if (user.role !== "driver") {
//       throw new Error("Not a driver account");
//     }

//     setDriver(user as DriverUser);
//   };

//   /**
//    * Driver Logout
//    */
//   const logout = async () => {
//     await authService.logout();
//     localStorage.removeItem("dashboard");
//     setDriver(null);
//   };

//   return (
//     <DriverAuthContext.Provider
//       value={{
//         isAuthenticated,
//         driver,
//         isLoading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </DriverAuthContext.Provider>
//   );
// }

// /* ================= HOOK ================= */

// export function useDriverAuth() {
//   const context = useContext(DriverAuthContext);
//   if (!context) {
//     throw new Error("useDriverAuth must be used within DriverAuthProvider");
//   }
//   return context;
// }





import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authService } from "@/services/auth.service";

export interface DriverUser {
  id: string;
  email: string;
  role: "driver";
  firstName?: string;
  lastName?: string;
}

interface DriverAuthContextType {
  isAuthenticated: boolean;
  driver: DriverUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const DriverAuthContext = createContext<DriverAuthContextType | undefined>(
  undefined
);

export function DriverAuthProvider({ children }: { children: ReactNode }) {
  const [driver, setDriver] = useState<DriverUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!driver;

  useEffect(() => {
    // Check if there's a stored driver session
    const storedDriver = localStorage.getItem("driver");
    const token = localStorage.getItem("fleetpro_auth_token");
    
    if (storedDriver && token) {
      try {
        const parsedDriver = JSON.parse(storedDriver);
        if (parsedDriver.role === "driver") {
          setDriver(parsedDriver);
        }
      } catch (e) {
        console.error("Failed to parse stored driver", e);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setDriver(null);
      localStorage.removeItem("driver");
      localStorage.removeItem("driverDashboard");
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = async (email: string, password: string) => {
    const user = await authService.login({ email, password });

    if (user.role !== "driver") {
      throw new Error("Not a driver account. Please use the admin/support login.");
    }

    // Store driver info separately
    const driverUser = user as DriverUser;
    setDriver(driverUser);
    localStorage.setItem("driver", JSON.stringify(driverUser));
    
    // Store driver dashboard from login response
    const dashboard = localStorage.getItem("dashboard");
    if (dashboard) {
      localStorage.setItem("driverDashboard", dashboard);
      localStorage.removeItem("dashboard"); // Clean up admin dashboard key
    }
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("driver");
    localStorage.removeItem("driverDashboard");
    setDriver(null);
  };

  return (
    <DriverAuthContext.Provider
      value={{
        isAuthenticated,
        driver,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </DriverAuthContext.Provider>
  );
}

export function useDriverAuth() {
  const context = useContext(DriverAuthContext);
  if (!context) {
    throw new Error("useDriverAuth must be used within DriverAuthProvider");
  }
  return context;
}
