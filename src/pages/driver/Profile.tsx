
import { useState } from "react";
import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Mail, MapPin, LogOut, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/config";
import { authService } from "@/services/auth.service";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
const [step, setStep] = useState<1 | 2>(1);
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [error, setError] = useState("");

const [formData, setFormData] = useState({
  otp: "",
  newPassword: "",
  confirmPassword: "",
});

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "es-MX" : "en";
    i18n.changeLanguage(nextLang);
  };


  const handleSendOtp = async () => {
  if (!user?.email) return;

  setLoading(true);
  setError("");
  try {
    await authService.forgotPassword(user.email);
    setStep(2);
  } catch (err: any) {
    setError(err.response?.data?.message || t("settings.sendOTP"));
  } finally {
    setLoading(false);
  }
};

const handleResetPassword = async () => {
  setError("");

  if (formData.newPassword !== formData.confirmPassword) {
    setError(t("settings.passwordMismatch"));
    return;
  }

  setLoading(true);
  try {
    const resetToken = await authService.verifyOtp(
      user!.email,
      formData.otp
    );

    await authService.resetPassword(
      resetToken,
      formData.newPassword
    );

    setSuccess(true);
    setStep(1);
    setFormData({ otp: "", newPassword: "", confirmPassword: "" });

    setTimeout(() => setSuccess(false), 4000);
  } catch (err: any) {
    setError(err.response?.data?.message || "Reset failed");
  } finally {
    setLoading(false);
  }
};



  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: t("profile.logoutSuccessTitle"),
        description: t("profile.logoutSuccessDesc"),
      });
      navigate("/login", { replace: true });
    } catch {
      toast({
        title: t("profile.logoutErrorTitle"),
        description: t("profile.logoutErrorDesc"),
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <PageHeader title={t("profile.title")} />

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
            {t("profile.role")}
          </span>
        </div>

        {/* Account Info */}
        <div className="card-elevated p-4">
          <h3 className="font-semibold mb-4">
            {t("profile.accountInfo")}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3 border-b border-border/50">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  {t("profile.email")}
                </p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3 border-b border-border/50">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  {t("profile.contact")}
                </p>
                <p className="font-medium">{user?.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  {t("profile.roleLabel")}
                </p>
                <p className="font-medium capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>



{/* Change Password */}
<div className="card-elevated p-4 space-y-4">
  <h3 className="font-semibold">
    {t("settings.security")}
  </h3>

  {step === 1 ? (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleSendOtp}
      disabled={loading}
    >
      {t("settings.sendOTP")}
    </Button>
  ) : (
    <div className="space-y-3">
      <input
        placeholder={t("settings.enterOTP")}
        className="w-full h-10 rounded-md border px-3"
        value={formData.otp}
        onChange={(e) =>
          setFormData({ ...formData, otp: e.target.value })
        }
      />

      <input
        type="password"
        placeholder={t("settings.newPassword")}
        className="w-full h-10 rounded-md border px-3"
        value={formData.newPassword}
        onChange={(e) =>
          setFormData({ ...formData, newPassword: e.target.value })
        }
      />

      <input
        type="password"
        placeholder={t("settings.confirmPassword")}
        className="w-full h-10 rounded-md border px-3"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />

      <div className="flex gap-2">
        <Button
          onClick={handleResetPassword}
          disabled={loading}
        >
          {t("settings.verifyUpdate")}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setStep(1)}
        >
          {t("settings.cancel")}
        </Button>
      </div>
    </div>
  )}

  {error && (
    <p className="text-destructive text-sm">{error}</p>
  )}

  {success && (
    <p className="text-emerald-600 text-sm">
      {t("settings.passwordUpdated")}
    </p>
  )}
</div>

        {/* Language Switch (ABOVE dashboard button) */}
        <Button
          variant="outline"
          className="w-full h-12 flex items-center gap-2"
          onClick={toggleLanguage}
        >
          <Languages className="w-5 h-5" />
          {i18n.language === "en" ? "ES" : "EN"}
        </Button>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => navigate("/driver/dashboard")}
          >
            {t("profile.backToDashboard")}
          </Button>

          <Button
            variant="destructive"
            className="w-full h-12"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            {t("profile.logout")}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
