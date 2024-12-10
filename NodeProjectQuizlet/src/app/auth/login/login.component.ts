import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggedIn=false;
  loginError='';
  formControls: any;

  constructor(private fb: FormBuilder, private router: Router, private http:HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      // Récupérer les valeurs du formulaire
      const formData = this.loginForm.value;
      console.log('Form Data:', formData);
      const { email, password } = this.loginForm.value;
      console.log('Form is valid, submitting...');
      // Envoi de la requête HTTP à l'API pour vérifier l'email et le mot de passe
      this.http.post('http://localhost:3000/login', { email, password }).subscribe(
        (response: any) => {
          // Si la réponse est réussie, rediriger vers la page d'accueil
          console.log('Login successful:', response);
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
        },
        (error) => {
          // Afficher l'erreur en cas de connexion échouée
          this.loginError = error.error.message || 'Login failed';
        }
      );
    }


  }
}
