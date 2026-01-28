

import apiClient from '@/services/apiClient';
import { ALERT_API } from '@/api/alert.api';

export interface Alert {
  _id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'resolved';
  message: string;

  driver: {
    firstName: string;
    lastName: string;
  };

  truck: {
    vehicleNumber: string;
  };

  createdAt: string;
}

export const getAlerts = async (): Promise<Alert[]> => {
  const { data } = await apiClient.get(ALERT_API.LIST);
  return data.data ?? data;
};

export const resolveAlert = async (id: string) => {
  const { data } = await apiClient.patch(ALERT_API.RESOLVE(id));
  return data;
};
