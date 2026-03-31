// import { useState } from "react";
// import { Plus, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAgreements } from "@/hooks/useAgreement";
// import { AgreementDetailSheet } from "@/components/agreements/AgreementsDetailSheet";
// import { CreateAgreementDialog } from "@/components/agreements/CreateAgreementDialog";

// export default function Agreements() {
//   const { agreements, loading } = useAgreements();

//   const [selected, setSelected] = useState<any | null>(null);
//   const [openCreate, setOpenCreate] = useState(false);

//   const handleCloseDetail = () => setSelected(null);

//   if (loading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Agreements</h1>

//         <Button onClick={() => setOpenCreate(true)}>
//           <Plus className="h-4 w-4 mr-2" />
//           Create Agreement
//         </Button>
//       </div>

//       <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
//         <table className="w-full text-sm">
//           <thead className="bg-muted/40 border-b">
//             <tr>
//               <th className="p-4 text-left font-semibold">Agreement #</th>
//               <th className="p-4 text-left font-semibold">Customer</th>
//               <th className="p-4 text-left font-semibold">Origin</th>
//               <th className="p-4 text-left font-semibold">Destination</th>
//               <th className="p-4 text-left font-semibold">Trailer Type</th>
//               <th className="p-4 text-left font-semibold">Price</th>
//               <th className="p-4 text-right font-semibold">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {agreements.map((a: any) => (
//               <tr key={a._id} className="border-b hover:bg-muted/20 transition-colors">
//                 <td className="p-4 font-bold text-primary">
//                   {a._id?.slice(-6).toUpperCase()}
//                 </td>

//                 <td className="p-4 font-medium">
//                   {typeof a.customer === "object"
//                     ? a.customer?.legalName
//                     : a.customer}
//                 </td>

//                 <td className="p-4 text-muted-foreground">
//                   {a.originAddress}
//                 </td>

//                 <td className="p-4 text-muted-foreground">
//                   {a.destinationAddress}
//                 </td>

//                 <td className="p-4">
//                   <span className="px-2 py-1 bg-muted rounded text-[10px] font-bold uppercase">
//                     {a.trailerType}
//                   </span>
//                 </td>

//                 <td className="p-4 font-bold text-emerald-600">
//                   ${Number(a.tripPrice || 0).toLocaleString()}
//                 </td>

//                 <td className="p-4 text-right">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => setSelected(a)}
//                     className="hover:bg-primary hover:text-white transition-all"
//                   >
//                     View Detail
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AgreementDetailSheet
//         agreement={selected}
//         isOpen={!!selected}
//         onClose={handleCloseDetail}
//       />

//       <CreateAgreementDialog
//         open={openCreate}
//         onClose={() => setOpenCreate(false)}
//       />
//     </div>
//   );
// }


import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgreements } from "@/hooks/useAgreement";
import { AgreementDetailSheet } from "@/components/agreements/AgreementsDetailSheet";
import { CreateAgreementDialog } from "@/components/agreements/CreateAgreementDialog";

export default function Agreements() {
  const { agreements, loading } = useAgreements();

  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<any | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const handleCloseDetail = () => setSelected(null);

  /* 📄 PAGINATION */
  const totalPages = Math.ceil((agreements?.length || 0) / ITEMS_PER_PAGE);

  const paginatedAgreements = (agreements || []).slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agreements</h1>

        <Button onClick={() => setOpenCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Agreement
        </Button>
      </div>

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b">
            <tr>
              <th className="p-4 text-left font-semibold">Agreement #</th>
              <th className="p-4 text-left font-semibold">Customer</th>
              <th className="p-4 text-left font-semibold">Origin</th>
              <th className="p-4 text-left font-semibold">Destination</th>
              <th className="p-4 text-left font-semibold">Trailer Type</th>
              <th className="p-4 text-left font-semibold">Price</th>
              <th className="p-4 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAgreements.map((a: any) => (
              <tr key={a._id} className="border-b hover:bg-muted/20 transition-colors">
                <td className="p-4 font-bold text-primary">
                  {a._id?.slice(-6).toUpperCase()}
                </td>

                <td className="p-4 font-medium">
                  {typeof a.customer === "object"
                    ? a.customer?.legalName
                    : a.customer}
                </td>

                <td className="p-4 text-muted-foreground">
                  {a.originAddress}
                </td>

                <td className="p-4 text-muted-foreground">
                  {a.destinationAddress}
                </td>

                <td className="p-4">
                  <span className="px-2 py-1 bg-muted rounded text-[10px] font-bold uppercase">
                    {a.trailerType}
                  </span>
                </td>

                <td className="p-4 font-bold text-emerald-600">
                  ${Number(a.tripPrice || 0).toLocaleString()}
                </td>

                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelected(a)}
                    className="hover:bg-primary hover:text-white transition-all"
                  >
                    View Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 PAGINATION CONTROLS */}
      <div className="flex justify-end items-center gap-3 mt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span className="text-sm font-medium">{page}</span>

        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* SHEETS */}
      <AgreementDetailSheet
        agreement={selected}
        isOpen={!!selected}
        onClose={handleCloseDetail}
      />

      <CreateAgreementDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </div>
  );
}