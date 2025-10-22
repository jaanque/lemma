import { Component } from '@angular/core';
import { SupabaseService } from '../supabase';
import { FormsModule } from '@angular/forms';

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

  constructor(private supabaseService: SupabaseService) {}

  async register() {
    const { error } = await this.supabaseService.supabase.auth.signUp({
      email: this.email,
      password: this.password,
    });
    if (error) {
      console.error('Error registering:', error);
    }
  }
}
