import { Component, OnInit } from '@angular/core';
import { Manager } from "../../manager";
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service'
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  managerList:Manager[];
  selectedManager :Manager;
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,
    private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.fetchManagers().subscribe(data => {
      this.managerList = data.managerList;
    }, error => {this.handleError(error)})
  }

  listClick(manager) {
    this.selectedManager =manager;
  }

  createManager(){
  this.selectedManager= new Manager('', '');
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
