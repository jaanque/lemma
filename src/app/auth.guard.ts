import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const { data } = await supabase.supabase.auth.getUser();

  if (data.user) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
