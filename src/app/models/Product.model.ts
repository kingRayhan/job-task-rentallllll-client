export interface Product {
  _id: string;
  code: string;
  name: string;
  type: string;
  availability: boolean;
  needing_repair: boolean;
  durability: number;
  max_durability: number;
  mileage: number | null;
  price: number;
  minimum_rent_period: number;
}
