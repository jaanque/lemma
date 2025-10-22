import { Component, OnInit } from '@angular/core';
import { DataService } from '../data';
import { Certificate } from '../models/certificate.model';
import { NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone: true,
  imports: [NgFor, DatePipe],
})
export class ProfileComponent implements OnInit {
  certificates: Certificate[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUserCertificates().then(({ data }) => {
      this.certificates = data || [];
    });
  }
}
