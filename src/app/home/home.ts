import { Component } from '@angular/core';
import { SupabaseService } from '../supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class HomeComponent {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  async logout() {
    await this.supabase.supabase.auth.signOut();
    this.router.navigate(['']);
  }
}
