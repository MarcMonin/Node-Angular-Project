import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCardComponent } from '../favorite-card/favorite-card.component';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, FavoriteCardComponent],
  template: `
    <div class="favorites-container">
      <h2>Your Favorite Cities</h2>
      <div class="favorites-grid">
        <app-favorite-card
          *ngFor="let city of favorites"
          [cityName]="city"
          (remove)="onRemoveCity($event)"
        ></app-favorite-card>
      </div>
    </div>
  `,
  styles: [`
    .favorites-container {
      padding: 1rem;
    }
    
    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
  `]
})
export class FavoritesListComponent {
  @Input() favorites: string[] = [];
  @Output() removeCity = new EventEmitter<string>();

  onRemoveCity(cityName: string) {
    this.removeCity.emit(cityName);
  }
} 