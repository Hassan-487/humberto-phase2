

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
//   Package,
//   Truck,
//   Clock,
//   Play,
//   CheckCircle,
//   CheckCircle2,
//   Upload,
//   Camera,
//   FileText,
//   Loader2,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useState } from "react";

// const TripDetails = () => {
//   const { tripId } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

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

//   const documentsUploaded = Boolean(proofUrl && pictureUrl);

//   const trip =
//     inTransitTrip?.id === tripId
//       ? inTransitTrip
//       : assignedTrips.find((t) => t.id === tripId);

//   if (isLoading) {
//     return (
//       <AppLayout>
//         <PageHeader title="Trip Details" showBack />
//         <div className="px-4 py-10 flex justify-center">
//           <Loader2 className="animate-spin h-6 w-6" />
//         </div>
//       </AppLayout>
//     );
//   }

//   if (!trip) {
//     return (
//       <AppLayout>
//         <PageHeader title="Trip Details" showBack />
//         <div className="px-4 py-10 text-center">
//           <Button onClick={() => navigate("/driver/trips")}>
//             Back to Trips
//           </Button>
//         </div>
//       </AppLayout>
//     );
//   }

//   const isInProgress = trip.status === "in_progress";
//   const isScheduled = trip.status === "scheduled" || !trip.status;

//   const handleStartTrip = async () => {
//     setIsStarting(true);
//     try {
//       await startTrip.mutateAsync(trip.id);
//       toast({ title: "Trip started 🚛" });
//     } finally {
//       setIsStarting(false);
//     }
//   };

//   const handleProofUpload = async (file: File) => {
//     setProofFile(file);
//     try {
//       const res = await uploadProof.mutateAsync(file);
//       setProofUrl(res.url);
//       toast({ title: "Proof uploaded" });
//     } catch {
//       setProofFile(null);
//     }
//   };

//   const handlePictureUpload = async (file: File) => {
//     setPictureFile(file);
//     try {
//       const res = await uploadPicture.mutateAsync(file);
//       setPictureUrl(res.url);
//       toast({ title: "Picture uploaded" });
//     } catch {
//       setPictureFile(null);
//     }
//   };

//   // 🔥🔥🔥 THIS IS THE FIX 🔥🔥🔥
//   const handleCompleteTrip = async () => {
//     if (!documentsUploaded) {
//       toast({
//         title: "Documents required",
//         description: "Upload both documents first",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsCompleting(true);
//     try {
//       await completeTrip.mutateAsync({
//         tripId: trip.id,
//         docs: {
//           proofOfDeliveryUrl: proofUrl!,
//           deliveryPictureUrl: pictureUrl!,
//         },
//       });

//       toast({ title: "Trip completed 🎉" });
//       navigate("/driver/dashboard");
//     } catch (e: any) {
//       toast({
//         title: "Completion failed",
//         description: e?.response?.data?.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsCompleting(false);
//     }
//   };

//   return (
//     <AppLayout>
//       <PageHeader title="Trip Details" showBack />

//       <div className="px-4 pb-6 space-y-4">
//         <div className="card-elevated p-5">
//           <h2 className="font-bold">{trip.tripNumber}</h2>
//           <StatusBadge status={trip.status || "scheduled"} />
//           <p>{trip.origin}</p>
//           <p>↓</p>
//           <p>{trip.destination}</p>
//         </div>

//         <div className="card-elevated p-4 grid grid-cols-2 gap-3">
//           <Info icon={Package} label="Cargo" value={trip.cargo} />
//           <Info icon={Clock} label="Estimated" value={`${trip.estimatedHours}h`} />
//           <Info icon={Truck} label="Truck" value={trip.truck.plate} />
//         </div>

//         {isInProgress && (
//           <div className="card-elevated p-5 space-y-4">
//             <DocumentUploadCard
//               label="Proof of Delivery"
//               icon={FileText}
//               accept="application/pdf"
//               file={proofFile}
//               isUploaded={!!proofUrl}
//               isUploading={uploadProof.isPending}
//               onFileSelect={(f) => f && handleProofUpload(f)}
//             />

//             <DocumentUploadCard
//               label="Delivery Picture"
//               icon={Camera}
//               accept="image/*"
//               file={pictureFile}
//               isUploaded={!!pictureUrl}
//               isUploading={uploadPicture.isPending}
//               onFileSelect={(f) => f && handlePictureUpload(f)}
//             />
//           </div>
//         )}

//         {isScheduled && (
//           <Button onClick={handleStartTrip} className="w-full h-14">
//             <Play className="mr-2" /> Start Trip
//           </Button>
//         )}

//         {isInProgress && (
//           <Button
//             onClick={handleCompleteTrip}
//             disabled={!documentsUploaded || isCompleting}
//             className="w-full h-14 bg-emerald-600"
//           >
//             <CheckCircle className="mr-2" /> Complete Trip
//           </Button>
//         )}
//       </div>
//     </AppLayout>
//   );
// };

// const Info = ({ icon: Icon, label, value }: any) => (
//   <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
//     <Icon className="w-5 h-5 text-primary" />
//     <div>
//       <p className="text-xs">{label}</p>
//       <p className="font-medium">{value}</p>
//     </div>
//   </div>
// );

// const DocumentUploadCard = ({
//   label,
//   icon: Icon,
//   accept,
//   file,
//   onFileSelect,
//   isUploaded,
//   isUploading,
// }: any) => (
//   <div className="border-2 border-dashed rounded-xl p-4">
//     <input
//       type="file"
//       accept={accept}
//       className="hidden"
//       id={label}
//       disabled={isUploaded || isUploading}
//       onChange={(e) => onFileSelect(e.target.files?.[0])}
//     />
//     <label htmlFor={label} className="flex items-center gap-4 cursor-pointer">
//       <Icon className="w-6 h-6" />
//       <div className="flex-1">
//         <p className="font-bold">{label}</p>
//         <p className="text-xs">{file?.name || "Click to upload"}</p>
//       </div>
//       {isUploading && <Loader2 className="animate-spin" />}
//       {isUploaded && <CheckCircle2 />}
//     </label>
//   </div>
// );

// export default TripDetails;


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
} from "@/hooks/usedriverportal";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Package,
  Truck,
  Clock,
  Play,
  CheckCircle,
  CheckCircle2,
  Camera,
  FileText,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const { data: inTransitTrip, isLoading } = useInTransitTrip();
  const { data: assignedTrips = [] } = useAssignedTrips();

  const startTrip = useStartTrip();
  const completeTrip = useCompleteTrip();
  const uploadProof = useUploadProofOfDelivery();
  const uploadPicture = useUploadDeliveryPicture();

  const [isStarting, setIsStarting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);
  const [proofUrl, setProofUrl] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);

  const documentsUploaded = Boolean(proofUrl && pictureUrl);

  const trip =
    inTransitTrip?.id === tripId
      ? inTransitTrip
      : assignedTrips.find((t) => t.id === tripId);

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

  const handleStartTrip = async () => {
    setIsStarting(true);
    try {
      await startTrip.mutateAsync(trip.id);
      toast({ title: t("driverTripDetails.tripStarted") });
    } finally {
      setIsStarting(false);
    }
  };

  const handleProofUpload = async (file) => {
    setProofFile(file);
    try {
      const res = await uploadProof.mutateAsync(file);
      setProofUrl(res.url);
      toast({ title: t("driverTripDetails.proofUploaded") });
    } catch {
      setProofFile(null);
    }
  };

  const handlePictureUpload = async (file) => {
    setPictureFile(file);
    try {
      const res = await uploadPicture.mutateAsync(file);
      setPictureUrl(res.url);
      toast({ title: t("driverTripDetails.pictureUploaded") });
    } catch {
      setPictureFile(null);
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
        docs: {
          proofOfDeliveryUrl: proofUrl,
          deliveryPictureUrl: pictureUrl,
        },
      });
      toast({ title: t("driverTripDetails.tripCompleted") });
      navigate("/driver/dashboard");
    } catch (e) {
      toast({
        title: t("driverTripDetails.completionFailed"),
        description: e?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <AppLayout>
      <PageHeader title={t("driverTripDetails.title")} showBack />

      <div className="px-4 pb-6 space-y-4">
        <div className="card-elevated p-5">
          <h2 className="font-bold">{trip.tripNumber}</h2>
          <StatusBadge status={trip.status || "scheduled"} />
          <p>{trip.origin}</p>
          <p>↓</p>
          <p>{trip.destination}</p>
        </div>

        <div className="card-elevated p-4 grid grid-cols-2 gap-3">
          <Info icon={Package} label={t("driverTripDetails.cargo")} value={trip.cargo} />
          <Info
            icon={Clock}
            label={t("driverTripDetails.estimated")}
            value={`${trip.estimatedHours}h`}
          />
          <Info icon={Truck} label={t("driverTripDetails.truck")} value={trip.truck.plate} />
        </div>

        {isInProgress && (
          <div className="card-elevated p-5 space-y-4">
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

        {isScheduled && (
          <Button onClick={handleStartTrip} className="w-full h-14" disabled={isStarting}>
            <Play className="mr-2" />
            {t("driverTripDetails.startTrip")}
          </Button>
        )}

        {isInProgress && (
          <Button
            onClick={handleCompleteTrip}
            disabled={!documentsUploaded || isCompleting}
            className="w-full h-14 bg-emerald-600"
          >
            <CheckCircle className="mr-2" />
            {t("driverTripDetails.completeTrip")}
          </Button>
        )}
      </div>
    </AppLayout>
  );
};

const Info = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
    <Icon className="w-5 h-5 text-primary" />
    <div>
      <p className="text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const DocumentUploadCard = ({
  label,
  icon: Icon,
  accept,
  file,
  onFileSelect,
  isUploaded,
  isUploading,
}) => {
  const { t } = useTranslation(); // ✅ ADD THIS LINE

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
        <Icon className="w-6 h-6" />
        <div className="flex-1">
          <p className="font-bold">{label}</p>
          <p className="text-xs">
            {file?.name || t("driverTripDetails.clickToUpload")}
          </p>
        </div>
        {isUploading && <Loader2 className="animate-spin" />}
        {isUploaded && <CheckCircle2 />}
      </label>
    </div>
  );
};


export default TripDetails;
