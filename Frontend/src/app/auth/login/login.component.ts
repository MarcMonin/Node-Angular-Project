import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn=false;
  loginError='';
  formControls: any;

  constructor(private fb: FormBuilder, private router: Router, private http:HttpClient, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      // Get form data
      const formData = this.loginForm.value;
      console.log('Form Data:', formData);
      const { email, password } = this.loginForm.value;
      console.log('Form is valid, submitting...');
      // Send login request
      this.http.post('http://localhost:3000/api/login', { email, password }).subscribe(
        (response: any) => {
          // If login is successful, redirect to home page
          console.log('Login successful:', response);
          this.isLoggedIn = true;
          // Store user information
          this.authService.setCurrentUser(response.user);
          this.router.navigate(['/home']);
        },
        (error) => {
          // Display error message
          this.loginError = error.error.message || 'Login failed';
        }
      );
    }


  }
}
