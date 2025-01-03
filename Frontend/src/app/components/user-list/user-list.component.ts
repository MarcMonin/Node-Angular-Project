import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users">
      <p>Email: {{ user.email }}</p>
    </div>
  `,
  standalone: true,
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
