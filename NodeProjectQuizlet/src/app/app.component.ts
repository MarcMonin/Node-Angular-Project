import { Component } from '@angular/core';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent, LoginComponent, RouterOutlet, HomeComponent, NavbarComponent,UserListComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NodeProjectQuizlet';
}
