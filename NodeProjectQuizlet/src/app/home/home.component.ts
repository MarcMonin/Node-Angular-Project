import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FavoritesListComponent } from '../components/favorites-list/favorites-list.component';
import { WeatherService } from '../services/weather.service';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: [{
    description: string;
    icon: string;
  }];
}

interface Favourite {
  id: number;
  city_name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    FavoritesListComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchCity = '';
  weatherData: WeatherData[] = [];
  favourites: Favourite[] = [];
  private userId = 1; // ? remplacer par l'ID de l'utilisateur connect?
  private apiKey = 'VOTRE_CLE_API_OPENWEATHER';

  favorites: string[] = [];
  
  constructor(
    private authService: AuthService, 
    private http: HttpClient,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.authService.getFavorites().subscribe(
      response => {
        this.favorites = response.favourites.map((f: any) => f.city_name);
      },
      error => console.error('Error loading favorites:', error)
    );
  }
  searchWeather() {
    if (!this.searchCity) return;
    
    this.weatherService.getWeather(this.searchCity)
      .subscribe({
        next: (data) => {
          this.weatherData = [data];
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
          // Ajouter une gestion d'erreur utilisateur ici
        }
      });
  }

  addToFavorites(cityName: string) {
    this.authService.addToFavorites(cityName).subscribe(
      response => {
        console.log('City added to favorites:', response);
        this.loadFavorites(); // Reload the favorites list
      },
      error => console.error('Error adding to favorites:', error)
    );
  }

  removeFromFavorites(cityName: string) {
    this.authService.removeFavorite(cityName).subscribe(
      response => {
        console.log('City removed from favorites:', response);
        this.loadFavorites();
      },
      error => console.error('Error removing from favorites:', error)
    );
  }
}
