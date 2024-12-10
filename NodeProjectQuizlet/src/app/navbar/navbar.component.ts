import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isHelpOpen= false;
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  openHelp() {
    this.router.navigate(['/help']);
  }


}
