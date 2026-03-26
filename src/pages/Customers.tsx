import { useState, useMemo } from "react";
import { Plus, Search, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PermissionGuard } from "@/components/PermissionGuard";
import { useCustomers } from "@/hooks/useCustomer";
import { CustomerProfileSheet } from "@/components/CustomerDetailSheet";
import { AddCustomerDialog } from "@/components/AddCustomerDialog";

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
    case "on_hold":
      return "bg-amber-500/10 text-amber-600 border-amber-200";
    case "blacklisted":
      return "bg-red-500/10 text-red-600 border-red-200";
    default:
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
};

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);

  const { customers, loading } = useCustomers();

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return customers.filter((c: any) =>
      (c.businessName || c.legalName || "").toLowerCase().includes(term) ||
      c.rfc?.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-sm text-muted-foreground">
            Businesses and individuals who pay for shipments
          </p>
        </div>

        <PermissionGuard>
          <Button onClick={() => setAddOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Customer
          </Button>
        </PermissionGuard>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or RFC"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 border-b">
            <tr>
              <th className="p-4 text-left">Business Name</th>
              <th className="p-4 text-left">RFC</th>
              <th className="p-4 text-left">Payment Terms</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((customer: any) => (
              <tr key={customer._id} className="hover:bg-muted/20">
                <td className="p-4 font-semibold">
                  {customer.businessName || customer.legalName}
                </td>
                <td className="p-4 text-muted-foreground">{customer.rfc}</td>
                <td className="p-4">
                  {customer.paymentTermsDays || 30} Days
                </td>
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClass(customer.status)}
                  >
                    {(customer.status || "active").replace("_", " ")}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Sheet open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <SheetContent className="sm:max-w-md p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Customer Profile
            </SheetTitle>
          </SheetHeader>

          <CustomerProfileSheet
            customer={selectedCustomer}
            getStatusBadgeClass={getStatusBadgeClass}
          />
        </SheetContent>
      </Sheet>

      <AddCustomerDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}