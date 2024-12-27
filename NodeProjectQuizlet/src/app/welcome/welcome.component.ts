import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherCityComponent } from '../weather-city/weather-city.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [WeatherCityComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
