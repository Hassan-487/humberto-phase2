import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDriverAuth } from "@/contexts/DriverAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DriverLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useDriverAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/driver/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Driver Portal</h1>
          <p className="text-muted-foreground">Sign in to manage your trips</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 card-elevated p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="driver@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Not a driver?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline"
          >
            Admin/Support Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default DriverLogin;