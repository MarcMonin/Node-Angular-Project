import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/users.json'; // Chemin vers le fichier JSON

  constructor(private http: HttpClient) {}

  // Fonction pour obtenir les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }
}
