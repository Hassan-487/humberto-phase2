import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDrivers } from "@/hooks/useDrivers";
import { Loader2 } from "lucide-react";

export function AddDriverDialog({ open, onClose }: any) {
  const { createDriver } = useDrivers();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    licenseNumber: "",
    licenseExpiry: "",
  });

  const submit = async () => {
    try {
      setLoading(true);

      await createDriver({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,          // ✅ REQUIRED
        phoneNumber: form.phoneNumber,          // ✅ MAP TO BACKEND
        licenseNumber: form.licenseNumber,
        licenseExpiry: form.licenseExpiry // ✅ REQUIRED
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        licenseNumber: "",
        licenseExpiry: "",
      });

      onClose();
    } catch (error) {
      console.error("Failed to create driver:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Register New Driver
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">

          {/* First Name */}
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2 col-span-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="space-y-2 col-span-2">
            <Label>Temporary Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label>Phone Number</Label>
            <Input
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />
          </div>

          {/* License Number */}
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label>License Number</Label>
            <Input
              value={form.licenseNumber}
              onChange={(e) =>
                setForm({ ...form, licenseNumber: e.target.value })
              }
            />
          </div>

          {/* License Expiry */}
          <div className="space-y-2 col-span-2">
            <Label>License Expiry</Label>
            <Input
              type="date"
              value={form.licenseExpiry}
              onChange={(e) =>
                setForm({ ...form, licenseExpiry: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
