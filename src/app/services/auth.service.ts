import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from "../../environments/environment";

export interface PostResponse {
  success?: string,
  msg?: string,
  token?: string,
  user?: {
    id: string,
    name: string,
    username: string,
    email: string
  }
}

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  path = environment.path;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<PostResponse>(this.path + '/users/register', user, { headers: headers })
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<PostResponse>(this.path + '/users/authenticate', user, { headers: headers })
  }

  getProfile() {
    return this.http.get<PostResponse>(this.path + '/users/profile')
  }

  get loadToken() {
    return localStorage.getItem('id_token');
  }
  
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter()
    if (!token) {
      return false
    }
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)
    return !tokenExpired
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
