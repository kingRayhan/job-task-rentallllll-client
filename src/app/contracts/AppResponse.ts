import { HttpStatus } from "./HttpStatus";

export interface AppResponse<DataModel> {
    data: DataModel;
    message: string;
    statusCode: HttpStatus;
}