import { Component } from '@angular/core';
import { DataService } from '../data';
import { Certificate } from '../models/certificate.model';
import { NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.html',
  styleUrls: ['./verify.css'],
  standalone: true,
  imports: [NgIf, FormsModule, DatePipe],
})
export class VerifyComponent {
  certificateId = '';
  certificate: (Certificate & { challenges: { title: string }; profiles: { username: string } }) | null =
    null;
  notFound = false;

  constructor(private dataService: DataService) {}

  verify() {
    this.dataService.verifyCertificate(this.certificateId).then(({ data }) => {
      this.certificate = data as any;
      this.notFound = !data;
    });
  }
}
