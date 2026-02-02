import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth'; 
import { Router, RouterLink } from '@angular/router';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Nav],
  templateUrl: './adminlogin.html',
  styleUrl: './adminlogin.css'
})
export class Adminlogin {
  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);

  loginData = { username: '', password: '' };
  errorMessage = '';
  isLoading = false;
  
  // New variable for password visibility
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.isLoading = true;
    
    this.http.post('http://localhost:3000/api/login', this.loginData)
      .subscribe({
        next: (res: any) => {
          this.authService.login(); 
          this.isLoading = false;
          this.router.navigate(['/']); 
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Login Failed: Access Denied';
        }
      });
  }
}