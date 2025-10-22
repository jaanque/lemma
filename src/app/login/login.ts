import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private readonly auth: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router
  ) {}

  async login() {
    const { error } = await this.auth.signIn({
      email: this.email,
      password: this.password,
    });
    if (error) {
      this.notification.setMessage(error.message);
    } else {
      this.notification.setMessage('Logged in successfully!');
      this.router.navigate(['/home']);
    }
  }
}
