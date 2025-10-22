import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data';
import { Challenge } from '../models/challenge.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../notification';
import { SupabaseService } from '../supabase';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.html',
  styleUrls: ['./challenge-detail.css'],
  standalone: true,
  imports: [NgIf, FormsModule],
})
export class ChallengeDetailComponent implements OnInit {
  challenge: Challenge | null = null;
  repoUrl = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private notification: NotificationService,
    private supabase: SupabaseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supabase.supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data }) => {
          this.challenge = data;
        });
    }
  }

  submit() {
    if (this.challenge) {
      this.dataService
        .createSubmission({
          challenge_id: this.challenge.id,
          repo_url: this.repoUrl,
        })
        .then(() => {
          this.notification.setMessage('Submission successful!');
        });
    }
  }
}
