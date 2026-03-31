

// import { useParams, useNavigate } from "react-router-dom";
// import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
// import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
// import {
//   useInTransitTrip,
//   useAssignedTrips,
//   useStartTrip,
//   useCompleteTrip,
//   useUploadProofOfDelivery,
//   useUploadDeliveryPicture,
// } from "@/hooks/usedriverportal";
// import { Button } from "@/components/ui/button";
// import { StatusBadge } from "@/components/ui/StatusBadge";
// import {
//   Package, Truck, Clock, Play, CheckCircle, CheckCircle2,
//   Camera, FileText, Loader2, ChevronRight, UserCheck, BoxSelect,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// // ─── Types ───────────────────────────────────────────────────────────────────

// type M4Form = {
//   loadAcceptanceDate: string;
//   loadAcceptanceHour: string;
//   tripStartDate: string;
//   tripStartHour: string;
// };

// type ContainerEntry = {
//   containerNumber: string;
//   sealNumber: string;
//   customer: string;
//   photos: File[];
// };

// type M5Form = {
//   arrivalDate: string;
//   arrivalHour: string;
//   containers: ContainerEntry[];
// };

// // ─── Main Component ───────────────────────────────────────────────────────────

// const TripDetails = () => {
//   const { tripId } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { t } = useTranslation();

//   const { data: inTransitTrip, isLoading } = useInTransitTrip();
//   const { data: assignedTrips = [] } = useAssignedTrips();

//   const startTrip = useStartTrip();
//   const completeTrip = useCompleteTrip();
//   const uploadProof = useUploadProofOfDelivery();
//   const uploadPicture = useUploadDeliveryPicture();

//   const [isStarting, setIsStarting] = useState(false);
//   const [isCompleting, setIsCompleting] = useState(false);
//   const [proofFile, setProofFile] = useState<File | null>(null);
//   const [pictureFile, setPictureFile] = useState<File | null>(null);
//   const [proofUrl, setProofUrl] = useState<string | null>(null);
//   const [pictureUrl, setPictureUrl] = useState<string | null>(null);

//   // M4 form state
//   const [m4Form, setM4Form] = useState<M4Form>({
//     loadAcceptanceDate: "",
//     loadAcceptanceHour: "",
//     tripStartDate: "",
//     tripStartHour: "",
//   });
//   const [m4Saved, setM4Saved] = useState(false);

//   // M5 form state
//   const [m5Form, setM5Form] = useState<M5Form>({
//     arrivalDate: "",
//     arrivalHour: "",
//     containers: [{ containerNumber: "", sealNumber: "", customer: "", photos: [] }],
//   });
//   const [m5Saved, setM5Saved] = useState(false);

//   const documentsUploaded = Boolean(proofUrl && pictureUrl);

//   const trip =
//     inTransitTrip?.id === tripId
//       ? inTransitTrip
//       : assignedTrips.find((t) => t.id === tripId);

//   // ── Loading / not found ──

//   if (isLoading) {
//     return (
//       <AppLayout>
//         <PageHeader title={t("driverTripDetails.title")} showBack />
//         <div className="px-4 py-10 flex justify-center">
//           <Loader2 className="animate-spin h-6 w-6" />
//         </div>
//       </AppLayout>
//     );
//   }

//   if (!trip) {
//     return (
//       <AppLayout>
//         <PageHeader title={t("driverTripDetails.title")} showBack />
//         <div className="px-4 py-10 text-center">
//           <Button onClick={() => navigate("/driver/trips")}>
//             {t("driverTripDetails.backToTrips")}
//           </Button>
//         </div>
//       </AppLayout>
//     );
//   }

//   const isInProgress = trip.status === "in_progress";
//   const isScheduled = trip.status === "scheduled" || !trip.status;

//   // ── Handlers ──

//   const handleStartTrip = async () => {
//     setIsStarting(true);
//     try {
//       await startTrip.mutateAsync(trip.id);
//       toast({ title: t("driverTripDetails.tripStarted") });
//     } finally {
//       setIsStarting(false);
//     }
//   };

//   const handleProofUpload = async (file: File) => {
//     setProofFile(file);
//     try {
//       const res = await uploadProof.mutateAsync(file);
//       setProofUrl(res.url);
//       toast({ title: t("driverTripDetails.proofUploaded") });
//     } catch {
//       setProofFile(null);
//     }
//   };

//   const handlePictureUpload = async (file: File) => {
//     setPictureFile(file);
//     try {
//       const res = await uploadPicture.mutateAsync(file);
//       setPictureUrl(res.url);
//       toast({ title: t("driverTripDetails.pictureUploaded") });
//     } catch {
//       setPictureFile(null);
//     }
//   };

//   const handleCompleteTrip = async () => {
//     if (!documentsUploaded) {
//       toast({
//         title: t("driverTripDetails.documentsRequired"),
//         description: t("driverTripDetails.uploadBothDocs"),
//         variant: "destructive",
//       });
//       return;
//     }
//     setIsCompleting(true);
//     try {
//       await completeTrip.mutateAsync({
//         tripId: trip.id,
//         docs: { proofOfDeliveryUrl: proofUrl!, deliveryPictureUrl: pictureUrl! },
//       });
//       toast({ title: t("driverTripDetails.tripCompleted") });
//       navigate("/driver/dashboard");
//     } catch (e: any) {
//       toast({
//         title: t("driverTripDetails.completionFailed"),
//         description: e?.response?.data?.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsCompleting(false);
//     }
//   };

//   // M4 save (calls API — replace with real hook when backend ready)
//   const handleSaveM4 = async () => {
//     try {
//       // TODO: replace with real API call, e.g. await saveDriverAcceptance.mutateAsync({ tripId: trip.id, ...m4Form });
//       console.log("M4 saved:", m4Form);
//       setM4Saved(true);
//       toast({ title: "Trip acceptance saved ✓" });
//     } catch {
//       toast({ title: "Failed to save", variant: "destructive" });
//     }
//   };

//   // M5 save
//   const handleSaveM5 = async () => {
//     try {
//       // TODO: replace with real API call
//       console.log("M5 saved:", m5Form);
//       setM5Saved(true);
//       toast({ title: "Loading data saved ✓" });
//     } catch {
//       toast({ title: "Failed to save", variant: "destructive" });
//     }
//   };

//   const setContainer = (i: number, k: keyof ContainerEntry, v: any) => {
//     setM5Form((prev) => {
//       const containers = [...prev.containers];
//       containers[i] = { ...containers[i], [k]: v };
//       return { ...prev, containers };
//     });
//   };

//   // ── Render ──

//   return (
//     <AppLayout>
//       <PageHeader title={t("driverTripDetails.title")} showBack />

//       <div className="px-4 pb-8 space-y-4">

//         {/* Trip summary card */}
//         <div className="card-elevated p-5 space-y-3">
//           <div className="flex items-center justify-between">
//             <h2 className="font-bold text-lg">{trip.tripNumber}</h2>
//             <StatusBadge status={trip.status || "scheduled"} />
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <span className="font-medium">{trip.origin}</span>
//             <ChevronRight className="h-4 w-4 text-muted-foreground" />
//             <span className="font-medium">{trip.destination}</span>
//           </div>
//         </div>

//         {/* Trip info grid */}
//         <div className="card-elevated p-4 grid grid-cols-2 gap-3">
//           <Info icon={Package} label={t("driverTripDetails.cargo")} value={trip.cargo} />
//           <Info icon={Clock} label={t("driverTripDetails.estimated")} value={`${trip.estimatedHours}h`} />
//           <Info icon={Truck} label={t("driverTripDetails.truck")} value={trip.truck?.plate} />
//         </div>

//         {/* ─────────────────────────────────────────────── */}
//         {/* MODULE 4 – Driver Acceptance & Trip Start       */}
//         {/* Fully editable by driver                        */}
//         {/* ─────────────────────────────────────────────── */}
//         <div className="card-elevated p-5 space-y-4">
//           <div className="flex items-center gap-2">
//             <UserCheck className="h-5 w-5 text-primary" />
//             <h3 className="font-bold text-base">Module 4 – Trip Acceptance</h3>
//             {m4Saved && (
//               <span className="ml-auto text-xs text-emerald-600 font-semibold flex items-center gap-1">
//                 <CheckCircle2 className="h-3.5 w-3.5" /> Saved
//               </span>
//             )}
//           </div>

//           <p className="text-xs text-muted-foreground">
//             Confirm your acceptance of this load and record when you started the trip.
//           </p>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <Label className="text-xs text-muted-foreground">Acceptance Date</Label>
//               <Input
//                 type="date"
//                 value={m4Form.loadAcceptanceDate}
//                 onChange={(e) => setM4Form((p) => ({ ...p, loadAcceptanceDate: e.target.value }))}
//               />
//             </div>
//             <div className="space-y-1">
//               <Label className="text-xs text-muted-foreground">Acceptance Hour</Label>
//               <Input
//                 type="time"
//                 value={m4Form.loadAcceptanceHour}
//                 onChange={(e) => setM4Form((p) => ({ ...p, loadAcceptanceHour: e.target.value }))}
//               />
//             </div>
//             <div className="space-y-1">
//               <Label className="text-xs text-muted-foreground">Trip Start Date</Label>
//               <Input
//                 type="date"
//                 value={m4Form.tripStartDate}
//                 onChange={(e) => setM4Form((p) => ({ ...p, tripStartDate: e.target.value }))}
//               />
//             </div>
//             <div className="space-y-1">
//               <Label className="text-xs text-muted-foreground">Trip Start Hour</Label>
//               <Input
//                 type="time"
//                 value={m4Form.tripStartHour}
//                 onChange={(e) => setM4Form((p) => ({ ...p, tripStartHour: e.target.value }))}
//               />
//             </div>
//           </div>

//           <Button className="w-full" onClick={handleSaveM4}>
//             Save Acceptance Details
//           </Button>
//         </div>

//         {/* ─────────────────────────────────────────────── */}
//         {/* MODULE 5 – Loading Data                         */}
//         {/* Fully editable by driver                        */}
//         {/* ─────────────────────────────────────────────── */}
//         <div className="card-elevated p-5 space-y-4">
//           <div className="flex items-center gap-2">
//             <BoxSelect className="h-5 w-5 text-primary" />
//             <h3 className="font-bold text-base">Module 5 – Loading Data</h3>
//             {m5Saved && (
//               <span className="ml-auto text-xs text-emerald-600 font-semibold flex items-center gap-1">
//                 <CheckCircle2 className="h-3.5 w-3.5" /> Saved
//               </span>
//             )}
//           </div>

//           <p className="text-xs text-muted-foreground">
//             Record your arrival at the loading point and enter container details.
//           </p>

//           {/* Arrival */}
//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <Label className="text-xs text-muted-foreground">Arrival Date</Label>
//               <Input
//                 type="date"
//                 value={m5Form.arrivalDate}
//                 onChange={(e) => setM5Form((p) => ({ ...p, arrivalDate: e.target.value }))}
//               />
//             </div>
//             <div className="space-y-1">
//               <Label className="text-xs text-muted-foreground">Arrival Hour</Label>
//               <Input
//                 type="time"
//                 value={m5Form.arrivalHour}
//                 onChange={(e) => setM5Form((p) => ({ ...p, arrivalHour: e.target.value }))}
//               />
//             </div>
//           </div>

//           {/* Containers */}
//           <div className="space-y-3">
//             <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
//               Containers
//             </p>

//             {m5Form.containers.map((container, i) => (
//               <div key={i} className="border rounded-xl p-4 space-y-3 bg-slate-50">
//                 <p className="text-xs font-semibold text-muted-foreground">Container {i + 1}</p>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="space-y-1">
//                     <Label className="text-xs text-muted-foreground">Container #</Label>
//                     <Input
//                       placeholder="e.g. MSKU1234567"
//                       value={container.containerNumber}
//                       onChange={(e) => setContainer(i, "containerNumber", e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <Label className="text-xs text-muted-foreground">Seal #</Label>
//                     <Input
//                       placeholder="e.g. SL-98765"
//                       value={container.sealNumber}
//                       onChange={(e) => setContainer(i, "sealNumber", e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-1 col-span-2">
//                     <Label className="text-xs text-muted-foreground">Customer</Label>
//                     <Input
//                       placeholder="Customer name"
//                       value={container.customer}
//                       onChange={(e) => setContainer(i, "customer", e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 {/* Photo upload per container */}
//                 <div>
//                   <Label className="text-xs text-muted-foreground block mb-1">
//                     Photos ({container.photos.length} uploaded)
//                   </Label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                     id={`container-photos-${i}`}
//                     onChange={(e) => {
//                       const files = Array.from(e.target.files || []);
//                       setContainer(i, "photos", [...container.photos, ...files]);
//                     }}
//                   />
//                   <label htmlFor={`container-photos-${i}`}>
//                     <div className="flex items-center gap-2 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer hover:border-primary transition-colors">
//                       <Camera className="h-5 w-5 text-muted-foreground" />
//                       <span className="text-sm text-muted-foreground">
//                         {container.photos.length > 0
//                           ? container.photos.map((f) => f.name).join(", ")
//                           : "Tap to take / upload photos"}
//                       </span>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             ))}

//             {/* Add container */}
//             <Button
//               variant="outline"
//               size="sm"
//               className="w-full text-xs"
//               onClick={() =>
//                 setM5Form((p) => ({
//                   ...p,
//                   containers: [
//                     ...p.containers,
//                     { containerNumber: "", sealNumber: "", customer: "", photos: [] },
//                   ],
//                 }))
//               }
//             >
//               + Add Another Container
//             </Button>
//           </div>

//           <Button className="w-full" onClick={handleSaveM5}>
//             Save Loading Data
//           </Button>
//         </div>

//         {/* ─────────────────────────────────────────────── */}
//         {/* POD Upload (M7 - in progress only)              */}
//         {/* ─────────────────────────────────────────────── */}
//         {isInProgress && (
//           <div className="card-elevated p-5 space-y-4">
//             <h3 className="font-bold text-base">Proof of Delivery</h3>
//             <DocumentUploadCard
//               label={t("driverTripDetails.proofOfDelivery")}
//               icon={FileText}
//               accept="application/pdf"
//               file={proofFile}
//               isUploaded={!!proofUrl}
//               isUploading={uploadProof.isPending}
//               onFileSelect={(f) => f && handleProofUpload(f)}
//             />
//             <DocumentUploadCard
//               label={t("driverTripDetails.deliveryPicture")}
//               icon={Camera}
//               accept="image/*"
//               file={pictureFile}
//               isUploaded={!!pictureUrl}
//               isUploading={uploadPicture.isPending}
//               onFileSelect={(f) => f && handlePictureUpload(f)}
//             />
//           </div>
//         )}

//         {/* Start Trip CTA */}
//         {isScheduled && (
//           <Button
//             onClick={handleStartTrip}
//             className="w-full h-14"
//             disabled={isStarting}
//           >
//             {isStarting
//               ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               : <Play className="mr-2 h-5 w-5" />
//             }
//             {t("driverTripDetails.startTrip")}
//           </Button>
//         )}

//         {/* Complete Trip CTA */}
//         {isInProgress && (
//           <Button
//             onClick={handleCompleteTrip}
//             disabled={!documentsUploaded || isCompleting}
//             className="w-full h-14 bg-emerald-600 hover:bg-emerald-700"
//           >
//             {isCompleting
//               ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               : <CheckCircle className="mr-2 h-5 w-5" />
//             }
//             {t("driverTripDetails.completeTrip")}
//           </Button>
//         )}
//       </div>
//     </AppLayout>
//   );
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// const Info = ({ icon: Icon, label, value }: { icon: any; label: string; value: any }) => (
//   <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
//     <Icon className="w-5 h-5 text-primary shrink-0" />
//     <div>
//       <p className="text-xs text-muted-foreground">{label}</p>
//       <p className="font-medium text-sm">{value}</p>
//     </div>
//   </div>
// );

// const DocumentUploadCard = ({
//   label, icon: Icon, accept, file, onFileSelect, isUploaded, isUploading,
// }: {
//   label: string;
//   icon: any;
//   accept: string;
//   file: File | null;
//   onFileSelect: (f: File | undefined) => void;
//   isUploaded: boolean;
//   isUploading: boolean;
// }) => {
//   const { t } = useTranslation();
//   return (
//     <div className="border-2 border-dashed rounded-xl p-4">
//       <input
//         type="file"
//         accept={accept}
//         className="hidden"
//         id={label}
//         disabled={isUploaded || isUploading}
//         onChange={(e) => onFileSelect(e.target.files?.[0])}
//       />
//       <label htmlFor={label} className="flex items-center gap-4 cursor-pointer">
//         <Icon className="w-6 h-6 shrink-0" />
//         <div className="flex-1">
//           <p className="font-bold text-sm">{label}</p>
//           <p className="text-xs text-muted-foreground">
//             {file?.name || t("driverTripDetails.clickToUpload")}
//           </p>
//         </div>
//         {isUploading && <Loader2 className="animate-spin h-5 w-5" />}
//         {isUploaded && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
//       </label>
//     </div>
//   );
// };

// export default TripDetails;

// Driver portal: TripDetails.tsx
// M4 (Driver Acceptance) and M5 (Loading Data) are fully editable by the driver
// and now call real API endpoints via useSaveDriverAcceptance / useSaveLoadingData.

import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
import {
  useInTransitTrip,
  useAssignedTrips,
  useStartTrip,
  useCompleteTrip,
  useUploadProofOfDelivery,
  useUploadDeliveryPicture,
  useSaveDriverAcceptance,
  useSaveLoadingData,
  useUploadContainerPhotos,
} from "@/hooks/usedriverportal";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Package, Truck, Clock, Play, CheckCircle, CheckCircle2,
  Camera, FileText, Loader2, ChevronRight, UserCheck, BoxSelect,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Types ───────────────────────────────────────────────────────────────────

type M4Form = {
  loadAcceptanceDate: string;
  loadAcceptanceHour: string;
  tripStartDate: string;
  tripStartHour: string;
};

type ContainerEntry = {
  containerNumber: string;
  sealNumber: string;
  customer: string;
  photos: File[];
};

type M5Form = {
  arrivalDate: string;
  arrivalHour: string;
  containers: ContainerEntry[];
};

// ─── Main Component ───────────────────────────────────────────────────────────

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  // ── Data ──
  const { data: inTransitTrip, isLoading } = useInTransitTrip();
  const { data: assignedTrips = [] } = useAssignedTrips();

  // ── Lifecycle mutations ──
  const startTrip = useStartTrip();
  const completeTrip = useCompleteTrip();
  const uploadProof = useUploadProofOfDelivery();
  const uploadPicture = useUploadDeliveryPicture();

  // ── M4 & M5 mutations ──
  const saveAcceptance = useSaveDriverAcceptance();
  const saveLoadingData = useSaveLoadingData();
  const uploadContainerPhotos = useUploadContainerPhotos();

  // ── Local state ──
  const [isStarting, setIsStarting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

  const [m4Form, setM4Form] = useState<M4Form>({
    loadAcceptanceDate: "",
    loadAcceptanceHour: "",
    tripStartDate: "",
    tripStartHour: "",
  });
  const [m4Saved, setM4Saved] = useState(false);

  const [m5Form, setM5Form] = useState<M5Form>({
    arrivalDate: "",
    arrivalHour: "",
    containers: [{ containerNumber: "", sealNumber: "", customer: "", photos: [] }],
  });
  const [m5Saved, setM5Saved] = useState(false);

  const documentsUploaded = Boolean(proofUrl && pictureUrl);

  const trip =
    inTransitTrip?.id === tripId
      ? inTransitTrip
      : assignedTrips.find((t: any) => t.id === tripId);

  // ── Loading / not found guards ──

  if (isLoading) {
    return (
      <AppLayout>
        <PageHeader title={t("driverTripDetails.title")} showBack />
        <div className="px-4 py-10 flex justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      </AppLayout>
    );
  }

  if (!trip) {
    return (
      <AppLayout>
        <PageHeader title={t("driverTripDetails.title")} showBack />
        <div className="px-4 py-10 text-center">
          <Button onClick={() => navigate("/driver/trips")}>
            {t("driverTripDetails.backToTrips")}
          </Button>
        </div>
      </AppLayout>
    );
  }

  const isInProgress = trip.status === "in_progress";
  const isScheduled = trip.status === "scheduled" || !trip.status;

  // ── Handlers ──

  const handleStartTrip = async () => {
    setIsStarting(true);
    try {
      await startTrip.mutateAsync(trip.id);
      toast({ title: t("driverTripDetails.tripStarted") });
    } catch (err: any) {
      toast({
        title: "Failed to start trip",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsStarting(false);
    }
  };

  const handleProofUpload = async (file: File) => {
    setProofFile(file);
    try {
      const res = await uploadProof.mutateAsync(file);
      setProofUrl(res.url);
      toast({ title: t("driverTripDetails.proofUploaded") });
    } catch {
      setProofFile(null);
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  const handlePictureUpload = async (file: File) => {
    setPictureFile(file);
    try {
      const res = await uploadPicture.mutateAsync(file);
      setPictureUrl(res.url);
      toast({ title: t("driverTripDetails.pictureUploaded") });
    } catch {
      setPictureFile(null);
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  const handleCompleteTrip = async () => {
    if (!documentsUploaded) {
      toast({
        title: t("driverTripDetails.documentsRequired"),
        description: t("driverTripDetails.uploadBothDocs"),
        variant: "destructive",
      });
      return;
    }
    setIsCompleting(true);
    try {
      await completeTrip.mutateAsync({
        tripId: trip.id,
        docs: { proofOfDeliveryUrl: proofUrl!, deliveryPictureUrl: pictureUrl! },
      });
      toast({ title: t("driverTripDetails.tripCompleted") });
      navigate("/driver/dashboard");
    } catch (e: any) {
      toast({
        title: t("driverTripDetails.completionFailed"),
        description: e?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  // ── M4: Save driver acceptance ──
  const handleSaveM4 = async () => {
    if (!m4Form.loadAcceptanceDate || !m4Form.tripStartDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in acceptance and start dates.",
        variant: "destructive",
      });
      return;
    }
    try {
      await saveAcceptance.mutateAsync({ tripId: trip.id, payload: m4Form });
      setM4Saved(true);
      toast({ title: "Trip acceptance saved ✓" });
    } catch (err: any) {
      toast({
        title: "Failed to save",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  // ── M5: Save loading data + upload photos ──
  const handleSaveM5 = async () => {
    if (!m5Form.arrivalDate) {
      toast({
        title: "Missing fields",
        description: "Please enter the arrival date.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save text data first
      await saveLoadingData.mutateAsync({
        tripId: trip.id,
        payload: {
          arrivalDate: m5Form.arrivalDate,
          arrivalHour: m5Form.arrivalHour,
          containers: m5Form.containers.map((c) => ({
            containerNumber: c.containerNumber,
            sealNumber: c.sealNumber,
            customer: c.customer,
          })),
        },
      });

      // Upload photos for each container that has them
      const photoUploads = m5Form.containers
        .map((c, i) => ({ files: c.photos, index: i }))
        .filter((c) => c.files.length > 0);

      await Promise.all(
        photoUploads.map(({ files, index }) =>
          uploadContainerPhotos.mutateAsync({
            tripId: trip.id,
            containerIndex: index,
            files,
          })
        )
      );

      setM5Saved(true);
      toast({ title: "Loading data saved ✓" });
    } catch (err: any) {
      toast({
        title: "Failed to save",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  const setContainer = (i: number, k: keyof ContainerEntry, v: any) => {
    setM5Form((prev) => {
      const containers = [...prev.containers];
      containers[i] = { ...containers[i], [k]: v };
      return { ...prev, containers };
    });
  };

  const m4Pending = saveAcceptance.isPending;
  const m5Pending = saveLoadingData.isPending || uploadContainerPhotos.isPending;

  // ── Render ──

  return (
    <AppLayout>
      <PageHeader title={t("driverTripDetails.title")} showBack />

      <div className="px-4 pb-8 space-y-4">

        {/* Trip summary card */}
        <div className="card-elevated p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">{trip.tripNumber}</h2>
            <StatusBadge status={trip.status || "scheduled"} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{trip.origin}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{trip.destination}</span>
          </div>
        </div>

        {/* Trip info grid */}
        <div className="card-elevated p-4 grid grid-cols-2 gap-3">
          <Info icon={Package} label={t("driverTripDetails.cargo")} value={trip.cargo} />
          <Info icon={Clock} label={t("driverTripDetails.estimated")} value={`${trip.estimatedHours}h`} />
          <Info icon={Truck} label={t("driverTripDetails.truck")} value={trip.truck?.plate} />
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* MODULE 4 – Driver Acceptance & Trip Start                   */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="card-elevated p-5 space-y-4">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base">Module 4 – Trip Acceptance</h3>
            {m4Saved && (
              <span className="ml-auto text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Saved
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Confirm your acceptance of this load and record when you started the trip.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Acceptance Date</Label>
              <Input
                type="date"
                value={m4Form.loadAcceptanceDate}
                onChange={(e) => setM4Form((p) => ({ ...p, loadAcceptanceDate: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Acceptance Hour</Label>
              <Input
                type="time"
                value={m4Form.loadAcceptanceHour}
                onChange={(e) => setM4Form((p) => ({ ...p, loadAcceptanceHour: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Trip Start Date</Label>
              <Input
                type="date"
                value={m4Form.tripStartDate}
                onChange={(e) => setM4Form((p) => ({ ...p, tripStartDate: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Trip Start Hour</Label>
              <Input
                type="time"
                value={m4Form.tripStartHour}
                onChange={(e) => setM4Form((p) => ({ ...p, tripStartHour: e.target.value }))}
              />
            </div>
          </div>

          <Button className="w-full gap-2" onClick={handleSaveM4} disabled={m4Pending}>
            {m4Pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Acceptance Details
          </Button>
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* MODULE 5 – Loading Data                                     */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="card-elevated p-5 space-y-4">
          <div className="flex items-center gap-2">
            <BoxSelect className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base">Module 5 – Loading Data</h3>
            {m5Saved && (
              <span className="ml-auto text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Saved
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Record your arrival at the loading point and enter container details.
          </p>

          {/* Arrival */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Arrival Date</Label>
              <Input
                type="date"
                value={m5Form.arrivalDate}
                onChange={(e) => setM5Form((p) => ({ ...p, arrivalDate: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Arrival Hour</Label>
              <Input
                type="time"
                value={m5Form.arrivalHour}
                onChange={(e) => setM5Form((p) => ({ ...p, arrivalHour: e.target.value }))}
              />
            </div>
          </div>

          {/* Containers */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Containers
            </p>

            {m5Form.containers.map((container, i) => (
              <div key={i} className="border rounded-xl p-4 space-y-3 bg-slate-50">
                <p className="text-xs font-semibold text-muted-foreground">Container {i + 1}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Container #</Label>
                    <Input
                      placeholder="e.g. MSKU1234567"
                      value={container.containerNumber}
                      onChange={(e) => setContainer(i, "containerNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Seal #</Label>
                    <Input
                      placeholder="e.g. SL-98765"
                      value={container.sealNumber}
                      onChange={(e) => setContainer(i, "sealNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label className="text-xs text-muted-foreground">Customer</Label>
                    <Input
                      placeholder="Customer name"
                      value={container.customer}
                      onChange={(e) => setContainer(i, "customer", e.target.value)}
                    />
                  </div>
                </div>

                {/* Photo upload per container */}
                <div>
                  <Label className="text-xs text-muted-foreground block mb-1">
                    Photos ({container.photos.length} selected)
                  </Label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id={`container-photos-${i}`}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setContainer(i, "photos", [...container.photos, ...files]);
                    }}
                  />
                  <label htmlFor={`container-photos-${i}`}>
                    <div className="flex items-center gap-2 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer hover:border-primary transition-colors">
                      <Camera className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {container.photos.length > 0
                          ? container.photos.map((f) => f.name).join(", ")
                          : "Tap to take / upload photos"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            ))}

            {/* Add container */}
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() =>
                setM5Form((p) => ({
                  ...p,
                  containers: [
                    ...p.containers,
                    { containerNumber: "", sealNumber: "", customer: "", photos: [] },
                  ],
                }))
              }
            >
              + Add Another Container
            </Button>
          </div>

          <Button className="w-full gap-2" onClick={handleSaveM5} disabled={m5Pending}>
            {m5Pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Loading Data
          </Button>
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* POD Upload  (M7 — in-progress trips only)                   */}
        {/* ─────────────────────────────────────────────────────────── */}
        {isInProgress && (
          <div className="card-elevated p-5 space-y-4">
            <h3 className="font-bold text-base">Proof of Delivery</h3>
            <DocumentUploadCard
              label={t("driverTripDetails.proofOfDelivery")}
              icon={FileText}
              accept="application/pdf"
              file={proofFile}
              isUploaded={!!proofUrl}
              isUploading={uploadProof.isPending}
              onFileSelect={(f) => f && handleProofUpload(f)}
            />
            <DocumentUploadCard
              label={t("driverTripDetails.deliveryPicture")}
              icon={Camera}
              accept="image/*"
              file={pictureFile}
              isUploaded={!!pictureUrl}
              isUploading={uploadPicture.isPending}
              onFileSelect={(f) => f && handlePictureUpload(f)}
            />
          </div>
        )}

        {/* Start Trip CTA */}
        {isScheduled && (
          <Button onClick={handleStartTrip} className="w-full h-14" disabled={isStarting}>
            {isStarting
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : <Play className="mr-2 h-5 w-5" />}
            {t("driverTripDetails.startTrip")}
          </Button>
        )}

        {/* Complete Trip CTA */}
        {isInProgress && (
          <Button
            onClick={handleCompleteTrip}
            disabled={!documentsUploaded || isCompleting}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700"
          >
            {isCompleting
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : <CheckCircle className="mr-2 h-5 w-5" />}
            {t("driverTripDetails.completeTrip")}
          </Button>
        )}
      </div>
    </AppLayout>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Info = ({ icon: Icon, label, value }: { icon: any; label: string; value: any }) => (
  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
    <Icon className="w-5 h-5 text-primary shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-sm">{value ?? "—"}</p>
    </div>
  </div>
);

const DocumentUploadCard = ({
  label, icon: Icon, accept, file, onFileSelect, isUploaded, isUploading,
}: {
  label: string;
  icon: any;
  accept: string;
  file: File | null;
  onFileSelect: (f: File | undefined) => void;
  isUploaded: boolean;
  isUploading: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="border-2 border-dashed rounded-xl p-4">
      <input
        type="file"
        accept={accept}
        className="hidden"
        id={label}
        disabled={isUploaded || isUploading}
        onChange={(e) => onFileSelect(e.target.files?.[0])}
      />
      <label htmlFor={label} className="flex items-center gap-4 cursor-pointer">
        <Icon className="w-6 h-6 shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">
            {file?.name || t("driverTripDetails.clickToUpload")}
          </p>
        </div>
        {isUploading && <Loader2 className="animate-spin h-5 w-5" />}
        {isUploaded && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
      </label>
    </div>
  );
};

export default TripDetails;