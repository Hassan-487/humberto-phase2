 

import { driverApi, Driver } from "@/api/driver.api";

export const driverService = {
  async getDrivers() {
    const res = await driverApi.getDrivers();
    return res.data.data;
  },

  async getDriver(id: string): Promise<Driver> {
    const res = await driverApi.getDriver(id);
    return res.data.data;
  },

  async createDriver(payload: Partial<Driver>) {
    const res = await driverApi.createDriver(payload);
    return res.data.data;
  },

  async updateDriver(id: string, payload: Partial<Driver>) {
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


