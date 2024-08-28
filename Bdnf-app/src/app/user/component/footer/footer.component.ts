import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../../services/news-service/newsletter.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  providers: [NewsletterService],
})
export class FooterComponent {

  constructor(private newsletterService: NewsletterService) {}
email = '';
  addNewsletter(): void{
const myEmail = {
  email: this.email
}
this.newsletterService.addNewsletter(myEmail).subscribe((response: any)=>{
  console.log("voir le nws", myEmail)
})
  }

}
