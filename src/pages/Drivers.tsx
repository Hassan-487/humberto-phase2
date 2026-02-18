

import { useState, useMemo,useEffect } from "react";
import { Plus, Search, User, Edit3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { driverService } from "@/services/driver.service";
import {Sheet,  SheetContent,  SheetHeader,  SheetTitle,SheetFooter,} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useDrivers } from "@/hooks/useDrivers";
import { AddDriverDialog } from "@/components/AddDriverDialog";
import { UpdateDriverDialog } from "@/components/UpdateDriverDialog";
import { DriverProfileSheet } from "@/components/DriverDetailSheet";
import { PermissionGuard } from "@/components/PermissionGuard";
import { useTranslation } from 'react-i18next';

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "idle":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
    case "assigned":
      return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "in_progress":
      return "bg-purple-700/15 text-purple-800 border-purple-400";
    case "stopped":
      return "bg-red-500/10 text-red-600 border-red-200";
    case "complete":
      return "bg-teal-500/10 text-teal-600 border-teal-200";
    case "inactive":
      return "bg-slate-200 text-slate-600 border-slate-300";
    default:
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
};
 
export default function Drivers() {
  const [page, setPage] = useState(1);
const [limit] = useState(10);
const [searchTerm, setSearchTerm] = useState("");

  const { drivers, pagination, loading, deleteDriver } =
  useDrivers(page, limit, searchTerm);

  const { t } = useTranslation();

  useEffect(() => {
  if (!searchTerm) {
    setPage(1);
    return;
  }

  const findPage = async () => {
    const allDrivers = await driverService.getAllDrivers();

    const index = allDrivers.findIndex((d: any) => {
      const fullName = `${d.firstName} ${d.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        d.phoneNumber?.includes(searchTerm)
      );
    });

    if (index !== -1) {
      const newPage = Math.floor(index / limit) + 1;
      setPage(newPage);
    }
  };

  findPage();
}, [searchTerm, limit]);


  const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
  const [editingDriver, setEditingDriver] = useState<any | null>(null);
  
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const filteredDrivers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (drivers || []).filter((d: any) => {
      const fullName = `${d.firstName} ${d.lastName}`.toLowerCase();
      const phone = d.phoneNumber?.toLowerCase() || "";
      const truck = d.assignedTruck?.licensePlate?.toLowerCase() || "";
      return fullName.includes(term) || phone.includes(term) || truck.includes(term);
    });
  }, [drivers, searchTerm]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }





  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('drivers.title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('drivers.description')}
          </p>
        </div>

        <PermissionGuard>
          <Button onClick={() => setAddOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> {t('drivers.addDriver')}
          </Button>
        </PermissionGuard>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('drivers.search')}
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 border-b">
            <tr>
              <th className="p-4 text-left">{t('drivers.name')}</th>
              <th className="p-4 text-left">{t('drivers.contact')}</th>
              <th className="p-4 text-left">{t('drivers.truck')}</th>
              <th className="p-4 text-left">{t('drivers.status')}</th>
              {/* <th className="p-4 text-left">{t('drivers.safety')}</th> */}
              <th className="p-4 text-right">{t('drivers.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredDrivers.map((driver: any) => (
              <tr key={driver._id} className="hover:bg-muted/20">
                <td className="p-4 font-semibold">
                  {driver.firstName} {driver.lastName}
                </td>
                <td className="p-4 text-muted-foreground">
                  {driver.phoneNumber}
                </td>
                <td className="p-4">
                  {driver.assignedTruck?.licensePlate || (
                    <span className="italic text-xs text-muted-foreground">
                      {t('drivers.unassigned')}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={`capitalize ${getStatusBadgeClass(driver.status)}`}
                  >
                    {t(`status.${driver.status}`)}
                  </Badge>
                </td>
                {/* <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {driver.performanceMetrics?.safetyScore || 0}%
                    </span>
                    <Progress
                      value={driver.performanceMetrics?.safetyScore || 0}
                      className="h-1.5 w-16"
                    />
                  </div>
                </td> */}
                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedDriver(driver)}
                  >
                    {t('drivers.viewProfile')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


<div className="flex justify-end items-center gap-3 mt-4">
  <Button
    size="sm"
    variant="outline"
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
  >
    Prev
  </Button>

  <span className="text-sm font-medium">
    {pagination?.page ?? page}
  </span>

  <Button
    size="sm"
    variant="outline"
    disabled={page === pagination?.totalPages}
    onClick={() => setPage((p) => p + 1)}
  >
    Next
  </Button>
</div>


      {/* PROFILE SHEET */}
      <Sheet open={!!selectedDriver} onOpenChange={() => setSelectedDriver(null)}>
        <SheetContent className="sm:max-w-md flex flex-col p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5 text-primary" /> {t('drivers.driverProfile')}
            </SheetTitle>
          </SheetHeader>

          <DriverProfileSheet
            selectedDriver={selectedDriver}
            getStatusBadgeClass={getStatusBadgeClass}
          />

          <PermissionGuard>
            <SheetFooter className="p-6 border-t mt-auto">
              <div className="flex gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    setEditingDriver(selectedDriver);
                    setSelectedDriver(null);
                    setEditOpen(true);
                  }}
                >
                  <Edit3 className="h-4 w-4" /> {t('drivers.editProfile')}
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={async () => {
                    if (!selectedDriver) return;
                    if (confirm(t('drivers.deleteConfirm'))) {
                      await deleteDriver(selectedDriver._id);
                      setSelectedDriver(null);
                    }
                  }}
                >
                  {t('drivers.terminateDriver')}
                </Button>
              </div>
            </SheetFooter>
          </PermissionGuard>
        </SheetContent>
      </Sheet>

      {/* DIALOGS */}
      <AddDriverDialog open={addOpen} onClose={() => setAddOpen(false)} />

      {editingDriver && (
        <UpdateDriverDialog
          open={editOpen}
          driver={editingDriver}
          onClose={() => {
            setEditOpen(false);
            setEditingDriver(null);
          }}
        />
      )}
    </div>
  );
}