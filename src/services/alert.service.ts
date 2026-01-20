import apiClient from './apiClient';
import { ALERT_API } from '@/api/alert.api';

export interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'acknowledged' | 'resolved' | 'ignored';
  message: string;
  truck: string;
  driver: string;
  location?: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
}

export const alertService = {
  async getAlerts(): Promise<Alert[]> {
    const response = await apiClient.get(ALERT_API.LIST);
    return response.data.data.map((item: any) => ({
      id: item._id, // Mongoose uses _id
      type: item.type.replace(/_/g, ' ').toUpperCase(),
      severity: item.severity,
      status: item.status,
      // Create a descriptive message based on the backend stationary data
      message: item.stationaryLocation?.address 
        ? `Stationary at ${item.stationaryLocation.address} for ${item.stationaryDuration} mins`
        : `${item.type.replace(/_/g, ' ')} detected`,
      truck: item.truck?.truckNumber || 'N/A',
      driver: item.driver ? `${item.driver.firstName} ${item.driver.lastName}` : 'Unassigned',
      timestamp: new Date(item.createdAt).toLocaleString(),
      acknowledged: item.status === 'acknowledged',
      resolved: item.status === 'resolved' || item.status === 'ignored'
    }));
  },

  async acknowledgeAlert(id: string, notes?: string): Promise<void> {
    await apiClient.post(ALERT_API.ACKNOWLEDGE(id), { notes: notes || "Acknowledged via Dashboard" });
  },

  async resolveAlert(id: string, outcome: string = 'support_intervened', notes?: string): Promise<void> {
    await apiClient.post(ALERT_API.RESOLVE(id), { 
      outcome, 
      notes: notes || "Resolved via Dashboard" 
    });
  },

  async ignoreAlert(id: string, reason?: string): Promise<void> {
    await apiClient.post(ALERT_API.DISMISS(id), { reason: reason || "False alarm" });
  },

  async getAlertStats() {
    const response = await apiClient.get(ALERT_API.STATS);
    const { summary, data } = response.data;
    
    // Find severity counts from the aggregation facet
    const getSevCount = (s: string) => data.bySeverity.find((x: any) => x._id === s)?.count || 0;

    return {
      total: data.byStatus.reduce((acc: number, curr: any) => acc + curr.count, 0),
      active: summary.activeCount,
      critical: summary.criticalCount,
      bySeverity: {
        low: getSevCount('low'),
        medium: getSevCount('medium'),
        high: getSevCount('high'),
        critical: getSevCount('critical')
      }
    };
  }
};