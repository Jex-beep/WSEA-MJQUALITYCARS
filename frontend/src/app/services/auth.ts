import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Check if 'isAdmin' flag exists in the browser storage on startup
  private initialStatus = typeof window !== 'undefined' ? localStorage.getItem('isAdmin') === 'true' : false;
  
  isLoggedIn = signal<boolean>(this.initialStatus);

  login() {
    localStorage.setItem('isAdmin', 'true'); // Save to browser memory
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('isAdmin'); // Remove from browser memory
    this.isLoggedIn.set(false);
  }
}