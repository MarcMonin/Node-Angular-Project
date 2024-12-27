import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url='http://localhost:3000/api/weather';
  constructor(private http: HttpClient) { }
  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.url}?city=${city}`);
  }
}

