import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    // Check localStorage on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  addToFavorites(cityName: string): Observable<any> {
    const userId = this.getCurrentUser()?.id;
    return this.http.post(`${this.apiUrl}/favourites`, { userId, cityName });
  }

  getFavorites(): Observable<any> {
    const userId = this.getCurrentUser()?.id;
    return this.http.get(`${this.apiUrl}/favourites/${userId}`);
  }

  removeFavorite(cityName: string): Observable<any> {
    const userId = this.getCurrentUser()?.id;
    return this.http.delete(`${this.apiUrl}/favourites`, {
      body: { userId, cityName }
    });
  }

  isLoggedIn(): boolean {
    // Check if there's a current user or auth token
    // This implementation depends on how you're storing the user's authentication state
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;  // Returns true if currentUser exists, false otherwise
  }
} 