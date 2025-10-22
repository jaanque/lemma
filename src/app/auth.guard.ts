import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.session.pipe(
    map((session) => {
      if (session) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    })
  );
};
