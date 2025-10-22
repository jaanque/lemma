import { Component, OnInit } from '@angular/core';
import { DataService } from '../data';
import { Submission } from '../models/submission.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  standalone: true,
  imports: [NgFor],
})
export class AdminDashboardComponent implements OnInit {
  submissions: Submission[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.dataService.getPendingSubmissions().then(({ data }) => {
      this.submissions = data || [];
    });
  }

  updateSubmissionStatus(id: string, status: 'approved' | 'rejected') {
    this.dataService.updateSubmissionStatus(id, status).then(() => {
      this.loadSubmissions();
    });
  }
}
