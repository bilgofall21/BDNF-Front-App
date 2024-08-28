import { Component } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {

}
