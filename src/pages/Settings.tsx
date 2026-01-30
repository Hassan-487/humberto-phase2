

import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, KeyRound } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Languages } from 'lucide-react';


export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
const { t } = useTranslation();

const toggleLanguage = () => {
  i18n.changeLanguage(i18n.language === 'en' ? 'es-MX' : 'en');
};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleRequestOTP = async () => {
    setLoading(true);
    setError("");
    try {
      await authService.forgotPassword(formData.email);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndUpdate = async () => {
    setError("");
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // 1. Get token from verification
      const resetToken = await authService.verifyOtp(formData.email, formData.otp);

      // 2. Pass all 3 required fields to the backend
      await authService.resetPassword(formData.email, resetToken, formData.newPassword);

      setSuccess(true);
      setStep(1);
      setFormData(prev => ({ ...prev, otp: "", newPassword: "", confirmPassword: "" }));
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset failed. Please verify your OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage profile and account security</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <input 
              id="fullName" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.fullName} 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" value={formData.email} disabled className="bg-muted cursor-not-allowed" />
          </div>

          <Separator className="md:col-span-2" />

          {step === 1 ? (
            <div className="md:col-span-2 space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <p className="text-sm font-medium text-primary">Need to update your password?</p>
                <p className="text-xs text-muted-foreground">We will send a code to {formData.email}.</p>
              </div>
              <Button onClick={handleRequestOTP} disabled={loading} variant="outline" className="gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                Send OTP to Email
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                <Input 
                  id="otp" 
                  placeholder="000000"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                  className="max-w-[200px] tracking-[0.5em] font-bold text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button onClick={handleVerifyAndUpdate} disabled={loading} className="gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Verify & Update
                </Button>
                <Button variant="ghost" onClick={() => setStep(1)}>Cancel</Button>
              </div>
            </>
          )}
        </div>

        {error && <p className="text-destructive text-sm font-medium flex items-center gap-1 animate-in shake"><AlertCircle className="h-4 w-4" /> {error}</p>}
        {success && <p className="text-emerald-600 text-sm font-medium flex items-center gap-1 animate-in slide-in-from-left-2"><CheckCircle2 className="h-4 w-4" /> Password updated successfully</p>}
      </div>

      {/* <div className="bg-card rounded-xl border border-border p-6 space-y-6 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System</h3>
          <p className="text-sm text-muted-foreground">Application status</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Timezone</p>
              <p className="text-sm text-muted-foreground">{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Version</p>
              <p className="text-sm text-muted-foreground"> Fleet Pro v1.0.4-stable</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">System Online</Badge>
          </div>
        </div>
      </div> */}


      <div className="bg-card rounded-xl border border-border p-6 space-y-6 shadow-sm">
  <div>
    <h3 className="text-lg font-semibold text-foreground">
      {t('settings.system')}
    </h3>
    <p className="text-sm text-muted-foreground">
      Application status
    </p>
  </div>

  <div className="space-y-4">
    {/* Language Toggle */}
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-foreground">
          {t('settings.language')}
        </p>
        <p className="text-sm text-muted-foreground">
          {i18n.language === 'en'
            ? t('settings.english')
            : t('settings.spanish')}
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="gap-2"
      >
        <Languages className="h-4 w-4" />
        {i18n.language === 'en' ? 'ES' : 'EN'}
      </Button>
    </div>

    <Separator />

    {/* Timezone */}
    {/* <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-foreground">Timezone</p>
        <p className="text-sm text-muted-foreground">
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
      </div>
      <Button variant="outline" size="sm">Change</Button>
    </div> */}

    <Separator />

    {/* Version */}
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-foreground">Version</p>
        <p className="text-sm text-muted-foreground">
          Fleet Pro v1.0.4-stable
        </p>
      </div>
      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
        System Online
      </Badge>
    </div>
  </div>
</div>

    </div>
  );
}