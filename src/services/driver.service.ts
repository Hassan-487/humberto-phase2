


import { driverApi } from "@/api/driver.api";

export const driverService = {
  async getDrivers(params?: { page?: number; limit?: number; search?: string }) {
    const res = await driverApi.getDrivers(params);
    return res.data;
  },

  async getAllDrivers() {
    const res = await driverApi.getDrivers({ limit: 20 });
    return res.data.data;
  },

  async createDriver(payload: any) {
    const res = await driverApi.createDriver(payload);
    return res.data.data;
  },

  async updateDriver(id: string, payload: any) {
    const res = await driverApi.updateDriver(id, payload);
    return res.data.data;
  },

  async deleteDriver(id: string) {
    await driverApi.deleteDriver(id);
  },
    async uploadDriverDocuments(formData: FormData) {
     const res = await driverApi.uploadDriverDocuments(formData);
     return res.data.data;
   },
};
