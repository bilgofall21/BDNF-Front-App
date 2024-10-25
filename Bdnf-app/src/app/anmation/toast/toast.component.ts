import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  show = false;
  message: string = '';
  title: string = 'Notification';
  time: string = '';

  showToast(message: string, title: string = 'Notification') {
    this.message = message;
    this.title = title;
    this.time = new Date().toLocaleTimeString();
    this.show = true;
    setTimeout(() => this.hideToast(), 5000);  // Cache le toast après 5 secondes
  }

  hideToast() {
    this.show = false;
  }

}
