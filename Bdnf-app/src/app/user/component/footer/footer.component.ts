import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../../services/news-service/newsletter.service';
import { RouterLink } from '@angular/router';
import { ToastComponent } from '../../../anmation/toast/toast.component';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, ToastComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  providers: [NewsletterService],
})
export class FooterComponent {

  constructor(private newsletterService: NewsletterService) {}
  @ViewChild('ToastComponent') toast?: ToastComponent;
email = '';
  addNewsletter(): void{
const myEmail = {
  email: this.email
}
this.newsletterService.addNewsletter(myEmail).subscribe((response: any)=>{
  console.log("voir le nws", response);
  this.toast?.showToast('Inscription aux newsletter réussi')

  this.email = '';
})
  }



}
