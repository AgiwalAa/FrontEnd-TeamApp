import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service'
import { AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user :any;
  constructor(private flashMessage :FlashMessagesService,
    private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1000 })
    this.user = data.user;
    })
  }

}
