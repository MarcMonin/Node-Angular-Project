import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFavorites(userId: number): Observable<{favourites: Favorite[]}> {
    return this.http.get<{favourites: Favorite[]}>(`${this.API_URL}/favourites/${userId}`);
  }

  addFavorite(userId: number, cityName: string): Observable<any> {
    return this.http.post(`${this.API_URL}/favourites`, { userId, cityName });
  }

  removeFavorite(userId: number, cityName: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/favourites`, {
      body: { userId, cityName }
    });
  }
} 