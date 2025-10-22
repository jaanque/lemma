import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { HomeComponent } from './home/home';
import { authGuard } from './auth.guard';
import { ChallengeListComponent } from './challenge-list/challenge-list';
import { ChallengeDetailComponent } from './challenge-detail/challenge-detail';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { adminGuard } from './admin.guard';
import { ProfileComponent } from './profile/profile';
import { VerifyComponent } from './verify/verify';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: ChallengeListComponent },
      { path: 'challenge/:id', component: ChallengeDetailComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'verify', component: VerifyComponent },
];
