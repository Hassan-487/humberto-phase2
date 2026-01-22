import { Trip, Truck, Driver } from '@/utils/ddrvierss';

export const mockDriver: Driver = {
  id: 'DRV001',
  name: 'Ahmed Hassan',
  firstName: 'Ahmed',
  phone: '+966 50 123 4567',
  email: 'ahmed.hassan@logistics.com',
  licenseNumber: 'DL-2024-78901',
  licenseExpiry: '2026-08-15',
  licenseType: 'Heavy Vehicle (Class A)',
  joinedDate: '2022-03-01',
  rating: 4.8,
  totalTrips: 847,
};

export const mockTruck: Truck = {
  id: 'TRK001',
  number: 'TRK-4582',
  model: 'Volvo FH16',
  capacity: '25 Tons',
  status: 'active',
  fuelLevel: 78,
  mileage: '124,567 km',
  lastService: '2024-01-10',
  nextService: '2024-04-10',
};

export const mockTrips: Trip[] = [
  {
    id: 'TRP-2024-001',
    pickupLocation: 'Riyadh Warehouse',
    dropLocation: 'Jeddah Port',
    pickupAddress: '123 Industrial Area, Riyadh',
    dropAddress: '456 Port District, Jeddah',
    date: '2024-01-20',
    time: '08:00 AM',
    status: 'ongoing',
    distance: '950 km',
    estimatedDuration: '10 hours',
    cargo: 'Electronics',
    weight: '18 Tons',
  },
  {
    id: 'TRP-2024-002',
    pickupLocation: 'Dammam Factory',
    dropLocation: 'Riyadh Distribution',
    pickupAddress: '789 Factory Zone, Dammam',
    dropAddress: '321 Distribution Center, Riyadh',
    date: '2024-01-21',
    time: '06:00 AM',
    status: 'pending',
    distance: '420 km',
    estimatedDuration: '5 hours',
    cargo: 'Machinery Parts',
    weight: '22 Tons',
  },
  {
    id: 'TRP-2024-003',
    pickupLocation: 'Mecca Depot',
    dropLocation: 'Medina Hub',
    pickupAddress: '555 Logistics Park, Mecca',
    dropAddress: '777 Transport Hub, Medina',
    date: '2024-01-19',
    time: '07:30 AM',
    status: 'completed',
    distance: '450 km',
    estimatedDuration: '5.5 hours',
    cargo: 'Consumer Goods',
    weight: '15 Tons',
  },
  {
    id: 'TRP-2024-004',
    pickupLocation: 'Tabuk Center',
    dropLocation: 'Riyadh Main',
    pickupAddress: '111 North Zone, Tabuk',
    dropAddress: '999 Central Hub, Riyadh',
    date: '2024-01-18',
    time: '05:00 AM',
    status: 'completed',
    distance: '1,200 km',
    estimatedDuration: '14 hours',
    cargo: 'Food Products',
    weight: '20 Tons',
  },
  {
    id: 'TRP-2024-005',
    pickupLocation: 'Abha Warehouse',
    dropLocation: 'Khamis Hub',
    pickupAddress: '222 Mountain Road, Abha',
    dropAddress: '333 Valley District, Khamis',
    date: '2024-01-22',
    time: '09:00 AM',
    status: 'pending',
    distance: '80 km',
    estimatedDuration: '1.5 hours',
    cargo: 'Construction Materials',
    weight: '24 Tons',
  },
];

export const getTripStats = () => {
  const total = mockTrips.length;
  const active = mockTrips.filter(t => t.status === 'ongoing').length;
  const completed = mockTrips.filter(t => t.status === 'completed').length;
  const pending = mockTrips.filter(t => t.status === 'pending').length;
  
  return { total, active, completed, pending };
};

export const getActiveTrip = () => {
  return mockTrips.find(t => t.status === 'ongoing') || null;
};