import { Product } from "./Product.model";

export enum BOOKING_STATUS {
  CONSUMING = "CONSUMING",
  RETURNED = "RETURNED",
}

export interface Booking {
  _id: string;
  product: Product;
  user: string;
  used_mileage: number;
  booked_for_days: number;
  need_repair: boolean;
  status: BOOKING_STATUS;
  price: number;
  start_date: Date;
  estimated_end_date: Date;
  returned_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
