import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
import { AppResponse } from "./AppResponse";
import { HttpStatus } from "./HttpStatus";

export class AppAxiosResponse<DataModel> implements AxiosResponse {
  data: AppResponse<DataModel> | undefined;
  status: HttpStatus | undefined;
  statusText: string | undefined;
  headers: AxiosResponseHeaders | undefined;
  config: AxiosRequestConfig<any> | undefined;
  request?: any;
}
