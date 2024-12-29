import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="favorite-card">
      <h3>{{ cityName }}</h3>
      <button (click)="onRemove()" class="remove-btn">
        <span>?</span>
      </button>
    </div>
  `,
  styles: [`
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
      color: #ff4444;
      font-size: 1.5rem;
      cursor: pointer;
    }
  `]
})
export class FavoriteCardComponent {
  @Input() cityName!: string;
  @Output() remove = new EventEmitter<string>();

  onRemove() {
    this.remove.emit(this.cityName);
  }
} 