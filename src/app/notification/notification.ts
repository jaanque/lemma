import { Component, Signal } from '@angular/core';
import { NotificationService } from '../notification';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.html',
  styleUrls: ['./notification.css'],
  standalone: true,
  imports: [NgIf],
})
export class NotificationComponent {
  message: Signal<string | null>;

  constructor(notificationService: NotificationService) {
    this.message = notificationService.message;
  }
}
