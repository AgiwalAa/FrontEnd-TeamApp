import { Component, OnInit, Input } from '@angular/core';
import { Manager } from "../../manager";
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service'
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router'
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-manager-details',
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.css']
})
export class ManagerDetailsComponent implements OnInit {
  @Input()
  manager: Manager;
  private managerList: Manager[] = [];
  constructor(private dataService: DataService, 
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService, private router : Router) { }

  ngOnInit() {
this.fetchManager();
  }

  fetchManager(){
    this.dataService.fetchManagers().subscribe(data => {
      this.managerList = data.managerList;
    }, error => {
      this.handleError(error);
    })
  }
  private handleError(error: any) {
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
  createManager(manager) {
  this.dataService.createManager(manager).subscribe(data => {
    this.displayMessage(data.msg,data.success);  this.refreshPage()}, error => {this.handleError(error)})
  }

  updateManager(manager){
    this.dataService.updateManager(manager).subscribe(data => {
      this.displayMessage(data.msg,data.success); this.refreshPage()}, error => {this.handleError(error)})
  }

  deleteManager(manager){
    this.dataService.deleteManager(manager).subscribe(data => {
    this.refreshPage()}, error => {this.handleError(error)})
  }
  
}
