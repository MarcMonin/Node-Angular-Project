import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {HttpClientModule,HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public isRegistered = false; 
  registerError: string = ''; 
  registerSuccess: string = '';
  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Validation for email
      password: ['', [Validators.required, Validators.minLength(6)]] // Validation for password
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.http.post('http://localhost:3000/api/register', formData).subscribe(
        (response: any) => {
          this.registerSuccess = response.message;
          this.registerError = '';
          this.isRegistered = true;
          
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => {
          this.registerError = error.error.message || 'Erreur lors de l\'inscription.';
          this.registerSuccess = '';
          this.isRegistered = false;
        }
      );
    }
  }

}
