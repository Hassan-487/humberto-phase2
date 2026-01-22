// import { recentAlerts } from '@/data/demoData';

// const getAlertBadgeClass = (type: string) => {
//   switch (type) {
//     case 'Critical':
//       return 'status-badge status-critical';
//     case 'Warning':
//       return 'status-badge status-warning';
//     case 'Info':
//       return 'status-badge status-info';
//     default:
//       return 'status-badge';
//   }
// };

// export function AlertsTable() {
//   return (
//     <div className="bg-card rounded-xl border border-border overflow-hidden">
//       <div className="px-6 py-4 border-b border-border">
//         <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Message</th>
//               <th>Truck</th>
//               <th>Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentAlerts.map((alert) => (
//               <tr key={alert.id}>
//                 <td>
//                   <span className={getAlertBadgeClass(alert.type)}>
//                     {alert.type}
//                   </span>
//                 </td>
//                 <td className="text-foreground">{alert.message}</td>
//                 <td className="text-muted-foreground">{alert.truck}</td>
//                 <td className="text-muted-foreground">{alert.timestamp}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";

const getAlertBadgeClass = (type: string) => {
  switch (type) {
    case "Critical":
      return "status-badge status-critical";
    case "Warning":
      return "status-badge status-warning";
    case "Info":
      return "status-badge status-info";
    default:
      return "status-badge";
  }
};

export function AlertsTable() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const loadAlerts = async () => {
      const data = await dashboardService.getRecentAlerts(5);
      setAlerts(data);
    };

    loadAlerts();
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Alerts
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Message</th>
              <th>Driver</th>
              <th>Truck</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>
                  <span className={getAlertBadgeClass(alert.type)}>
                    {alert.type}
                  </span>
                </td>
                <td className="text-foreground">{alert.message}</td>
                <td className="text-foreground">{alert.driver}</td>
                <td className="text-muted-foreground">{alert.truck}</td>
                <td className="text-muted-foreground">{alert.timestamp}</td>
              </tr>
            ))}

            {alerts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted-foreground py-6">
                  No alerts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
