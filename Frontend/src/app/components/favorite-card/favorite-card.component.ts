import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="favorite-card">
      <button class="favorite-btn" (click)="onClickFavorite()">{{ cityName }}</button>
      <button (click)="onClickFavorite()" class="remove-btn">
        <span> X </span>
      </button>
    </div>
  `,
  styles: [`

    .favorite-btn {
      background: none;
      border: none;
      color: #000000;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .favorite-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin: 0.5rem 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .remove-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  line-height: 1;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 4px;
  transition: all 0.2s ease;
}
    .remove-btn:hover {
      background-color: #ff4444;
      color: white;
    }
  `]
})
export class FavoriteCardComponent {
  @Input() cityName!: string;
  @Output() remove = new EventEmitter<string>();
  constructor(private router: Router) {}

  onClickFavorite() {
    this.router.navigate(['/weather', this.cityName]);
  }
}