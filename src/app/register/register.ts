import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [FormsModule],
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private readonly auth: AuthService,
    private readonly notification: NotificationService
  ) {}

  async register() {
    const { error } = await this.auth.signUp({
      email: this.email,
      password: this.password,
    });
    if (error) {
      this.notification.setMessage(error.message);
    } else {
      this.notification.setMessage('Registration successful! Please check your email for a confirmation link.');
    }
  }
}
