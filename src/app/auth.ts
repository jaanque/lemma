import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase: SupabaseClient;
  private _session: AuthSession | null = null;
  private sessionSubject = new BehaviorSubject<Session | null>(null);

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
      this.sessionSubject.next(this._session);
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      this._session = session;
      this.sessionSubject.next(this._session);
    });
  }

  get session() {
    return this.sessionSubject.asObservable();
  }

  async signIn(credentials: { email: any; password: any }) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  async signUp(credentials: { email: any; password: any }) {
    return this.supabase.auth.signUp(credentials);
  }

  signOut() {
    this.supabase.auth.signOut();
  }
}
