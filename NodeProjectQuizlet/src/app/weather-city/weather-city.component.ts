import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-weather-city',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, HttpClientModule, RouterModule], // Add HttpClientModule here
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.css']
})
export class WeatherCityComponent {
  
  goToForecast(city: string) {
    this.router.navigate(['/forecast'], {
      queryParams: { city: city }
    });
  }

  weatherData: any = null;
  city: string = 'paris';
  correctCity: boolean = false;

  constructor(private weatherService: WeatherService, private router: Router) { }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      if (data) {
        if (data.cod === 200) {
          this.correctCity = true;
          this.city = city;
          this.weatherData = data;
          console.log('Weather data received:', this.weatherData);
        }
        else {
          this.correctCity = false;
        }
      }
      else {
        this.correctCity = false;
      }
    });
  }

  getTemperatureEmoji(temp: number): string {
    if (temp >= 30) return '🥵'; // Hot
    if (temp >= 20) return '☀️'; // Warm/Sunny
    if (temp >= 10) return '😊'; // Mild
    if (temp >= 0) return '❄️';  // Cold
    return '🥶';                 // Freezing
  }
}
