import { Component, OnInit } from '@angular/core';
import { DataService } from '../data';
import { Challenge } from '../models/challenge.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.html',
  styleUrls: ['./challenge-list.css'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getChallenges().then(({ data }) => {
      this.challenges = data || [];
    });
  }
}
