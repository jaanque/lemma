import { Component } from '@angular/core';
import { SupabaseService } from './supabase';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  constructor(private readonly supabase: SupabaseService) {}

  async logout() {
    await this.supabase.supabase.auth.signOut();
  }
}
