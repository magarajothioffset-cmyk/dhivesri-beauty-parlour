export type ServiceCategory = 'all' | 'haircut' | 'waxing' | 'facial' | 'bleach';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'haircut' | 'waxing' | 'facial' | 'bleach';
  categoryLabel: string;
  price: number;
  duration?: string;
  description: string;
  popular?: boolean;
}

export interface BookingFormState {
  fullName: string;
  phone: string;
  addressArea: string;
  landmark: string;
  date: string;
  timeSlot: string;
  selectedServiceIds: string[];
  specialRequests: string;
}
