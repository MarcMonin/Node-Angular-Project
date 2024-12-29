import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherCityComponent } from '../weather-city/weather-city.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [WeatherCityComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  styles: [`
    .card {
      transition: transform 0.2s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .card:hover {
      transform: translateY(-5px);
    }

    .btn {
      padding: 0.5rem 1.5rem;
    }

    .display-4 {
      color: #2c3e50;
      font-weight: 600;
    }
  `]
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToWeather() {
    this.router.navigate(['/weather']);
  }

  goToForecast() {
    this.router.navigate(['/forecast']);
  }
}
