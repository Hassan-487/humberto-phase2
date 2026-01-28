
import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
import { useAuth } from "@/contexts/AuthContext"; // CHANGED: Use unified auth
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, logout } = useAuth(); // CHANGED: Use unified auth context
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout>
      <PageHeader title="Profile" />

      <div className="px-4 pb-6 space-y-5">
        {/* Profile Header */}
        <div className="card-elevated p-6 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user?.firstName || "Driver"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {user?.email}
          </p>
          <span className="inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-primary">
            Driver
          </span>
        </div>

        {/* Profile Details */}
        <div className="card-elevated p-4">
          <h3 className="font-semibold mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3 border-b border-border/50">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3 border-b border-border/50">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">User contact</p>
                <p className="font-medium">{user?.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => navigate("/driver/dashboard")}
          >
            Back to Dashboard
          </Button>

          <Button
            variant="destructive"
            className="w-full h-12"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;