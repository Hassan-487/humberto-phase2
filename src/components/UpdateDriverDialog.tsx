import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDrivers } from "@/hooks/useDrivers";

interface UpdateDriverDialogProps {
  open: boolean;
  onClose: () => void;
  driver: any;
}

export function UpdateDriverDialog({ open, onClose, driver }: UpdateDriverDialogProps) {
  const { updateDriver } = useDrivers();
  const [isPending, setIsPending] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    //Status: "",
    licenseNumber: "",
  });

  // Load driver data into form when dialog opens
  useEffect(() => {
    if (driver) {
      setForm({
        firstName: driver.firstName || "",
        lastName: driver.lastName || "",
        phoneNumber: driver.phoneNumber || "",
        email: driver.email || "",
       // Status: driver.Status || "active",
        licenseNumber: driver.licenseNumber || "",
      });
    }
  }, [driver, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateDriver({ id: driver._id, data: form });
      onClose();
    } catch (error) {
      console.error("Failed to update driver", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Driver Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input 
                value={form.firstName} 
                onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input 
                value={form.lastName} 
                onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input 
              type="email" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input 
                value={form.phoneNumber} 
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} 
                required 
              />
            </div>
            {/* <div className="space-y-2">
              <Label>Employment Status</Label>
              <Select 
                value={form.Status} 
                onValueChange={(v) => setForm({ ...form, Status: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div className="space-y-2">
            <Label>License Number</Label>
            <Input 
              value={form.licenseNumber} 
              onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} 
              required 
            />
          </div>

          <DialogFooter className="pt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Update Driver"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}