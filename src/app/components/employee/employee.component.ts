import { Component, OnInit } from '@angular/core';
import { Manager } from "../../manager";
import { Employee } from "../../employee";
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service'
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeList: Employee[];
  selectedEmployee : Employee;
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,
    private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.fetchEmployees().subscribe(data => {
      this.employeeList = data.employeeList;
    }, error => {this.handleError(error)})
  }

  listClick(employee) {
    this.selectedEmployee = employee;
  }

  createEmployee(employee){
  this.selectedEmployee = new Employee('', '', '', '');
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
