import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private url='http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.url}/weather?city=${city}`);
  }
  getWeatherForecast(city: string) {
    const a = this.http.get(`${this.url}/forecast?city=${city}`);
    // console.log(a);
    return a;
  }
}

