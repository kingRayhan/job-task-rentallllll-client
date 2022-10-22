import { AppAxiosResponse } from "@/app/contracts/AppAxiosResponse";
import { CommonPaginationDto } from "@/app/contracts/CommonPaginationDto";
import { PaginatedResponse } from "@/app/contracts/PaginatedResponse";
import { Product } from "@/app/models/Product.model";
import { httpClient } from "../client/httpClient";

class ProductApiRepo {
  public getProducts(
    payload: ProductListPayload
  ): Promise<AppAxiosResponse<PaginatedResponse<Product>>> {
    return httpClient.get("/products", { params: payload });
  }
}
export default new ProductApiRepo();

// -------------------------------------------------------------
// Payloads
// -------------------------------------------------------------
export interface ProductListPayload extends CommonPaginationDto {
  search?: string;

  sortBy?:
    | "name"
    | "type"
    | "availability"
    | "needing_repair"
    | "durability"
    | "max_durability"
    | "mileage"
    | "price"
    | "minimum_rent_period"
    | "-name"
    | "-type"
    | "-availability"
    | "-needing_repair"
    | "-durability"
    | "-max_durability"
    | "-mileage"
    | "-price"
    | "-minimum_rent_period";
}
