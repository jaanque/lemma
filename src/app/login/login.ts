import { Component } from '@angular/core';
import { SupabaseService } from '../supabase';
import { FormsModule } from '@angular/forms';

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

  constructor(private supabaseService: SupabaseService) {}

  async login() {
    const { error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });
    if (error) {
      console.error('Error logging in:', error);
    }
  }
}
