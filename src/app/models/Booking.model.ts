import { Product } from "./Product.model";

export interface Booking {
  _id: string;
  product: Product;
  user: string;
  used_mileage: number;
  booked_for_days: number;
  need_repair: boolean;
  status: string;
  price: number;
  start_date: Date;
  estimated_end_date: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
