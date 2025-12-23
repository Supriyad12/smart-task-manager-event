
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  name = '';
  email = '';
  password = '';

constructor(private authService: AuthService, private router: Router) {}

log(){
  this.router.navigate(['/login'])
}
register() {
  console.log(this.name, this.email, this.password);

  this.authService.register({
    name: this.name,
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {
      console.log('SUCCESS:', res);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('ERROR:', err);
      alert(err.error?.message || 'Registration failed');
    }
  });
}

}
