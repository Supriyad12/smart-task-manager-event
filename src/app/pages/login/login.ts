import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res.token) localStorage.setItem('token', res.token);
          alert(res.message || 'Login successful');
        this.router.navigate(['/tasks']);
        },
        error: (err) => alert(err.error?.message || 'Login failed')
      });
  }
  //  login() {
  //   this.authService.login({ email: this.email, password: this.password })
  //     .subscribe({
  //       next: (res: any) => {
  //         if (res.token) localStorage.setItem('token', res.token);
  //         alert(res.message || 'Login successful');
  //       this.router.navigate(['/tasks']);
  //       },
  //       error: (err) => alert(err.error?.message || 'Login failed')
  //     });
  // }
}