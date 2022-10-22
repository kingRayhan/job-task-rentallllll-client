import { AppAxiosResponse } from "@/app/contracts/AppAxiosResponse";
import { PublicUser } from "@/app/models/User.model";
import { httpClient } from "../client/httpClient";

class UserApiRepository {
  public currentUser(): Promise<AppAxiosResponse<PublicUser>> {
    return httpClient.get("/user");
  }
}
export default new UserApiRepository();

// -------------------------------------------------------------
// Payloads
// -------------------------------------------------------------
// export interface LoginPayload {
//   user: string;
//   password: string;
// }
// export interface RegisterPayload {
//   avatar?: string;
//   name: string;
//   username?: string;
//   email: string;
//   password: string;
//   phone: string;
// }
// -------------------------------------------------------------
// Responses
// -------------------------------------------------------------
// export interface LoginResponse {}
