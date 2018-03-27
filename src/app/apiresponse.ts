import { Manager } from "./manager";
import { Employee } from "./employee";

export class ApiResponse {
    success? : boolean;
    msg? : string;
    managerList? : Manager[];
    employeeList? : Employee[];
}
