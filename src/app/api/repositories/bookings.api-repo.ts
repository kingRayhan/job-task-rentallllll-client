import { AppAxiosResponse } from "@/app/contracts/AppAxiosResponse";
import { CommonPaginationDto } from "@/app/contracts/CommonPaginationDto";
import { PaginatedResponse } from "@/app/contracts/PaginatedResponse";
import { Booking, BOOKING_STATUS } from "@/app/models/Booking.model";
import { httpClient } from "../client/httpClient";

class BookingApiRepo {
  public bookProduct(payload: BookProductPayload) {
    return httpClient.post("/bookings", payload);
  }

  /**
   *
   * @param payload
   * @returns
   */
  public myBookings(
    payload: MyBookingListPayload
  ): Promise<AppAxiosResponse<PaginatedResponse<Booking>>> {
    return httpClient.get("/bookings/my-bookings", { params: payload });
  }
}
export default new BookingApiRepo();

// -------------------------------------------------------------
// Payloads
// -------------------------------------------------------------

export interface BookProductPayload {
  product: string;
  start_date: Date;
  estimated_end_date: Date;
}

export interface MyBookingListPayload extends CommonPaginationDto {
  status?: BOOKING_STATUS;
}
