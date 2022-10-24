import { CommonPaginationDto } from "@/app/contracts/CommonPaginationDto";
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
  public myBookings(payload: MyBookingListPayload) {
    return httpClient.get("/bookings/my-bookings", { params: payload });
  }
}
export default new BookingApiRepo();

// -------------------------------------------------------------
// Payloads
// -------------------------------------------------------------
enum BOOKING_STATUS {
  CONSUMING = "CONSUMING",
  RETURNED = "RETURNED",
}

export interface BookProductPayload {
  product: string;
  start_date: Date;
  estimated_end_date: Date;
}

export interface MyBookingListPayload extends CommonPaginationDto {
  status?: BOOKING_STATUS;
}
