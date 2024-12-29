import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-city',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, HttpClientModule, RouterModule],
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.css']
})
export class WeatherCityComponent {
  weatherData: any = null;
  city: string;
  correctCity: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.city = this.route.snapshot.params['city'] || 'paris';
    this.getWeather(this.city);
  }

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
    if (temp >= 30) return '🥵'; 
    if (temp >= 20) return '☀️'; 
    if (temp >= 10) return '😊'; 
    if (temp >= 0) return '❄️';  
    return '🥶';                 
  }
}
