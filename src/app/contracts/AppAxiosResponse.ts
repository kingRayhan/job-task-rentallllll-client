import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
import { HttpStatus } from "@/app/api/contracts/HttpStatus";
import { AppResponse } from "./AppResponse";

export class AppAxiosResponse<DataModel> implements AxiosResponse {
  data: AppResponse<DataModel> | undefined;
  // @ts-ignore
  status: HttpStatus | undefined;
  // @ts-ignore
  statusText: string | undefined;
  // @ts-ignore
  headers: AxiosResponseHeaders | undefined;
  // @ts-ignore
  config: AxiosRequestConfig<any> | undefined;
  request?: any;
}
