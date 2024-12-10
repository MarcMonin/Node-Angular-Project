import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-helppage',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './helppage.component.html',
  styleUrl: './helppage.component.css'
})
export class HelppageComponent {

}
