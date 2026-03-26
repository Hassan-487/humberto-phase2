import { useState, useMemo } from "react";
import { Plus, Search, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PermissionGuard } from "@/components/PermissionGuard";
import { useCompanies } from "@/hooks/useCompany";
import { CompanyProfileSheet } from "@/components/CompanyProfileSheet";
import { AddCompanyDialog } from "@/components/AddCompanyDialog";
import { useTranslation } from "react-i18next";

const getStatusBadgeClass = (status: string) => {
  return status === "active"
    ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
    : "bg-red-500/10 text-red-600 border-red-200";
};

export default function Companies() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);

  const { companies, loading } = useCompanies();

  /* ✅ FIXED FILTER (no businessName in backend) */
  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (companies || []).filter((c: any) =>
      (c.legalName || "").toLowerCase().includes(term) ||
      (c.rfc || "").toLowerCase().includes(term)
    );
  }, [companies, searchTerm]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t("companies.title")}</h2>
          <p className="text-sm text-muted-foreground">
            Outsourced fleet partners
          </p>
        </div>

        <PermissionGuard>
          <Button onClick={() => setAddOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Company
          </Button>
        </PermissionGuard>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or RFC"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 border-b">
            <tr>
              <th className="p-4 text-left">Business Name</th>
              <th className="p-4 text-left">RFC</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((company: any) => (
              <tr key={company._id} className="hover:bg-muted/20">
                {/* ✅ FIX: no businessName → use legalName */}
                <td className="p-4 font-semibold">
                  {company.legalName}
                </td>

                <td className="p-4 text-muted-foreground">
                  {company.rfc}
                </td>

                {/* ✅ FIX: contactNumber → whatsappNumber */}
                <td className="p-4">
                  {company.whatsappNumber || "—"}
                </td>

                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClass(company.status)}
                  >
                    {(company.status || "active")}
                  </Badge>
                </td>

                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedCompany(company)}
                  >
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PROFILE SHEET */}
      <Sheet
        open={!!selectedCompany}
        onOpenChange={() => setSelectedCompany(null)}
      >
        <SheetContent className="sm:max-w-md p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company Profile
            </SheetTitle>
          </SheetHeader>

          <CompanyProfileSheet company={selectedCompany} />
        </SheetContent>
      </Sheet>

      <AddCompanyDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}