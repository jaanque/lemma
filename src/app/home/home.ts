import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class HomeComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['']);
  }
}
