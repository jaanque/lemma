import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message = signal<string | null>(null);

  setMessage(message: string) {
    this.message.set(message);
    setTimeout(() => this.clearMessage(), 5000);
  }

  clearMessage() {
    this.message.set(null);
  }
}
