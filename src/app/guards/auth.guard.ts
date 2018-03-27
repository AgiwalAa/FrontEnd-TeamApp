import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
    ) { }

    canActivate(): boolean {
        if (this.auth.loggedIn()) {
          return true;
        }  else {
          localStorage.removeItem('id_token');
          this.router.navigateByUrl('/login');
          return false;
        }
      }
    }