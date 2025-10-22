import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { Challenge } from './models/challenge.model';
import { Submission } from './models/submission.model';
import { Certificate } from './models/certificate.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  supabase: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  getChallenges() {
    return this.supabase.from('challenges').select('*').returns<Challenge[]>();
  }

  async createSubmission(submission: Partial<Submission>) {
    const { data: user } = await this.supabase.auth.getUser();
    if (!user) {
      throw new Error('User not logged in');
    }
    return this.supabase.from('submissions').insert({ ...submission, user_id: user.user?.id });
  }

  getPendingSubmissions() {
    return this.supabase
      .from('submissions')
      .select('*')
      .eq('status', 'pending')
      .returns<Submission[]>();
  }

  updateSubmissionStatus(id: string, status: 'approved' | 'rejected') {
    return this.supabase.from('submissions').update({ status }).eq('id', id);
  }

  async getUserCertificates() {
    const { data: user } = await this.supabase.auth.getUser();
    if (!user) {
      throw new Error('User not logged in');
    }
    return this.supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.user?.id)
      .returns<Certificate[]>();
  }

  verifyCertificate(id: string) {
    return this.supabase
      .from('certificates')
      .select('*, challenges(title), profiles(username)')
      .eq('id', id)
      .single();
  }
}
