import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Manager } from "../manager";
import { Observable } from "rxjs/Observable";
import { ApiResponse } from "../apiresponse";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Employee } from "../employee";
import { environment } from "../../environments/environment";

@Injectable()
export class DataService {
  path = environment.path;
  constructor(private http: HttpClient) { }

  createManager(manager) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<ApiResponse>(this.path + '/manager/create', manager, { headers: headers })
  }

  createEmployee(employee) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<ApiResponse>(this.path + '/employee/create', employee, { headers: headers })
  }
  
  fetchManagers(){
    return this.http.get<ApiResponse>(this.path + '/manager/fetch')
  }

  fetchEmployees(){
    return this.http.get<ApiResponse>(this.path + '/employee/fetch')
  }

  updateManager(manager){
    return this.http.put<ApiResponse>(this.path  + '/manager/update' + '/' + manager._id,manager)
  }

  updateEmployee(employee){
    return this.http.put<ApiResponse>(this.path + '/employee/update' + '/' + employee._id, employee)
  }

  deleteManager(manager){
    return this.http.delete<ApiResponse>(this.path + '/manager/delete' + '/' + manager._id, manager)
  }

  deleteEmployee(employee){
    return this.http.delete<ApiResponse>(this.path + '/employee/delete' + '/' + employee._id, employee)
  }
}
