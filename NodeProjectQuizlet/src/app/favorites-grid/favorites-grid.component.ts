import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { FavoritesService } from '../services/favorites.service';
import { WeatherService } from '../services/weather.service';
import { Favorite } from '../models/favorite.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface FavoriteWithWeather extends Favorite {
  city_name?: string;
  temperature?: number;
  humidity?: number;
  description?: string;
  windSpeed?: number;
}

@Component({
  selector: 'app-favorites-grid',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './favorites-grid.component.html',
  styleUrls: ['./favorites-grid.component.css']
})
export class FavoritesGridComponent implements OnInit {
  modules = [ClientSideRowModelModule];
  
  columnDefs: ColDef[] = [
    { field: 'city_name', sortable: true, filter: true, headerName: 'City' },
    { 
      field: 'temperature', 
      sortable: true, 
      filter: true,
      headerName: 'Temperature',
      valueFormatter: (params) => params.value ? `${params.value}°C` : '-'
    },
    {
      field: 'humidity',
      sortable: true,
      filter: true,
      headerName: 'Humidity',
      valueFormatter: (params) => params.value ? `${params.value}%` : '-'
    },
    {
      field: 'description',
      sortable: true,
      filter: true,
      headerName: 'Weather'
    },
    {
      field: 'windSpeed',
      sortable: true,
      filter: true,
      headerName: 'Wind Speed',
      valueFormatter: (params) => params.value ? `${params.value} m/s` : '-'
    },
    {
      headerName: 'Remove',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerHTML = 'Remove';
        button.className = 'btn btn-danger btn-xs';
        button.style.padding = '0.25rem 0.5rem';
        button.style.fontSize = '0.875rem';
        button.addEventListener('click', () => {
          this.removeFavorite(params.data.city_name);
        });
        return button;
      }
    }
  ];

  rowData: FavoriteWithWeather[] = [];

  gridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    animateRows: true,
    domLayout: 'autoHeight' as const,
    rowHeight: 48,
    headerHeight: 48,
  };

  constructor(
    private favoritesService: FavoritesService,
    private weatherService: WeatherService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }
  loadFavorites() {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.favoritesService.getFavorites(userId).subscribe(response => {
        // Create an array to store favorites with weather data
        const favoritesWithWeather: FavoriteWithWeather[] = response.favourites;
        
        // Fetch weather data for each favorite city
        favoritesWithWeather.forEach((favorite, index) => {
          this.weatherService.getWeather(favorite.city_name || '').subscribe(
            weatherData => {
              favoritesWithWeather[index] = {
                ...favorite,
                temperature: weatherData.main.temp,
                humidity: weatherData.main.humidity,
                description: weatherData.weather[0].description,
                windSpeed: weatherData.wind.speed
              };
              // Update the grid data
              this.rowData = [...favoritesWithWeather];
            },
            error => {
              console.error(`Error fetching weather for ${favorite.city_name}:`, error);
              // Still show the favorite even if weather data couldn't be fetched
              this.rowData = [...favoritesWithWeather];
            }
          );
        });
      });
    }
  }

  removeFavorite(cityName: string) {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.favoritesService.removeFavorite(userId, cityName).subscribe(() => {
        this.loadFavorites();
        window.location.reload();
      });
    }
  }
}
