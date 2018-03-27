import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeComponent } from "./components/employee/employee.component";
import { EmployeeDetailsComponent } from "./components/employee-details/employee-details.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ManagerComponent } from "./components/manager/manager.component";
import { ManagerDetailsComponent } from "./components/manager-details/manager-details.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { AuthService } from "./services/auth.service";
import { DataService } from "./services/data.service";
import { ValidateService } from "./services/validate.service";
import { AuthGuard } from "./guards/auth.guard";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';

const routes = [
{path : '', component : HomeComponent},
{path : 'home', component : HomeComponent},
{path : 'register', component : RegisterComponent},
{path : 'login', component : LoginComponent},
{path : 'employee', component : EmployeeComponent, canActivate:[AuthGuard]},
{path : 'manager', component : ManagerComponent, canActivate:[AuthGuard]},
{path : 'profile', component : ProfileComponent, canActivate:[AuthGuard]}
]

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent, EmployeeComponent, EmployeeDetailsComponent,
    HomeComponent,LoginComponent,ManagerComponent,ManagerDetailsComponent,
    NavbarComponent, NotfoundComponent,ProfileComponent,RegisterComponent
  ],
  imports: [
    BrowserModule,FormsModule, HttpClientModule, RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [AuthInterceptorService,AuthService,DataService,ValidateService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
