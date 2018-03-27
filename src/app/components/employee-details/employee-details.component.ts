import { Component, OnInit, Input } from '@angular/core';
import { Manager } from "../../manager";
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service'
import { DataService } from '../../services/data.service'
import { Employee } from "../../employee";
import { ValidateService } from "../../services/validate.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input()
  employee: Employee;
  private managerList: Manager[] = [];
  constructor(private dataService: DataService, 
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService, private router : Router) { }

  ngOnInit() {
    this.dataService.fetchManagers().subscribe(data => {
      this.managerList = data.managerList;
    }, error => {
      this.handleError(error);
    })
  }

  private handleError(error: any) {
    console.log(error) //error
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
  
  //Display message to user
  displayMessage(msg : string, success : boolean ) {
    let alertClass = 'alert-danger';
    if(success){
         alertClass = 'alert-success'
    }
    this.flashMessage.show(msg, { cssClass: alertClass, timeout: 2000 })
  }

  cancel(){
    window.location.href = window.location.href
  }

  refreshPage() {
    setTimeout(
      function() {
        window.location.href = window.location.href
      }, 2000);
  }

  createEmployee(employee) {
  this.dataService.createEmployee(employee).subscribe(data => {
    this.displayMessage(data.msg,data.success); this.refreshPage()}, error => {this.handleError(error)})
  }

  updateEmployee(employee){
    this.dataService.updateEmployee(employee).subscribe(data => {
      this.displayMessage(data.msg,data.success); this.refreshPage()}, error => {this.handleError(error)})
  }

  deleteEmployee(employee){
    this.dataService.deleteEmployee(employee).subscribe(data => {
     this.refreshPage()}, error => {this.handleError(error)})
  }
}
