import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule, FormsModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {
  cities: string[] = [];
  searchCity: string = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: []
  };
  
  chart24hOptions: Highcharts.Options = {
    series: []
  };

  maxCities = 3; // Define maximum number of cities
  colors: string[] = [
    '#FF0000',   // Red
    '#00FF00',   // Green
    '#0000FF',   // Blue
    '#FFA500',   // Orange
    '#800080',   // Purple
    '#00FFFF',   // Cyan
    '#FF00FF',   // Magenta
    '#FFD700'    // Gold
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {
    route.queryParams.subscribe(params => {
      if (params['cities']) {
        this.cities = params['cities'].split(',');
        this.loadWeatherData();
      }
    });
  }

  ngOnInit() {
    // if (this.cities.length === 0) {
    //   this.router.navigate([], {
    //     relativeTo: this.route,
    //     queryParams: { cities: 'London,Paris,Berlin' }
    //   });
    // }
  }

  onSearch() {
    if (this.searchCity.trim() && !this.cities.includes(this.searchCity)) {
      if (this.cities.length >= this.maxCities) {
        alert(`Maximum ${this.maxCities} cities allowed`);
        this.searchCity = '';
        return;
      }
      this.cities.push(this.searchCity);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { cities: this.cities.join(',') }
      }).then(() => {
        window.location.reload();
      });
      this.searchCity = '';
    }
  }

  removeCity(city: string) {
    this.cities = this.cities.filter(c => c !== city);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { cities: this.cities.join(',') }
    }).then(() => {
      window.location.reload();
    });
  }

  private loadWeatherData() {
    if (this.cities.length === 0) return;

    const requests = this.cities.map(city => 
      this.weatherService.getWeatherForecast(city)
    );

    forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        const allSeries: any[] = [];
        const allSeries24h: any[] = [];

        // Get time categories from first response
        const timeCategories = responses[0].list.map((item: any) => {
          const date = new Date(item.dt * 1000);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        });

        const timeCategories24h = responses[0].list.slice(0, 8).map((item: any) => {
          const date = new Date(item.dt * 1000);
          return date.toLocaleTimeString();
        });

        // Process each city's data
        responses.forEach((response, index) => {
          const cityName = this.cities[index];
          const color = this.colors[index % this.colors.length];

          // Full forecast data
          const fullForecastData = response.list.map((item: any) => 
            parseFloat(item.main.temp.toFixed(1))
          );

          // 24h forecast data (first 8 points)
          const forecast24hData = response.list.slice(0, 8).map((item: any) => 
            parseFloat(item.main.temp.toFixed(1))
          );

          // Add series for full forecast
          allSeries.push({
            name: cityName,
            type: 'line',
            data: fullForecastData,
            color: color
          });

          // Add series for 24h forecast
          allSeries24h.push({
            name: cityName,
            type: 'line',
            data: forecast24hData,
            color: color
          });
        });

        // Update chart options
        this.updateChartOptions(timeCategories, timeCategories24h, allSeries, allSeries24h);
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
      }
    });
  }

  private updateChartOptions(times: string[], times24h: string[], allSeries: any[], allSeries24h: any[]) {
    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: '5-Day Temperature Forecast'
      },
      xAxis: {
        categories: times,
        title: { text: 'Time' }
      },
      yAxis: {
        title: { text: 'Temperature (?C)' }
      },
      series: allSeries,
      credits: { enabled: false },
      tooltip: {
        shared: true,
      },
      legend: {
        enabled: true
      }
    };

    this.chart24hOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: '24-Hour Temperature Forecast'
      },
      xAxis: {
        categories: times24h,
        title: { text: 'Time' }
      },
      yAxis: {
        title: { text: 'Temperature (?C)' }
      },
      series: allSeries24h,
      credits: { enabled: false },
      tooltip: {
        shared: true,
      },
      legend: {
        enabled: true
      }
    };
  }
}
