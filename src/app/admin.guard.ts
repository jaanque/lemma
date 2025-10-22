import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  return supabase.supabase
    .from('profiles')
    .select('role')
    .eq('id', supabase.supabase.auth.user()?.id)
    .single()
    .then(({ data }) => {
      if (data?.role === 'admin') {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    });
};
