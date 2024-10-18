import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { NewsletterService } from '../../services/news-service/newsletter.service';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../anmation/spinner/spinner.component';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [SidebarComponent, DateFormatPipe, FormsModule, ReactiveFormsModule, NgIf, SpinnerComponent],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent implements OnInit {

  constructor(private newsLetterService: NewsletterService){}


 libelle: string = '';
 contenu: string = '';
 public image: any;
 loadinData : boolean = false;
  ngOnInit(): void {
    this.newsletterForm= new FormGroup({
      libelle: new FormControl('', [Validators.required]),
      contenu: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      // image: new FormControl(null, [Validators.required]) // Contrôle pour l'image
    });
    this.getAllNewsletter();
  }

  newsletterForm!: FormGroup

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Fichier sélectionné :', this.selectedFile);
  }

   selectedFile: File | null = null;

   selectedElment: any;

   selectedEmail(element: any): void {
    this.newsletterForm.patchValue({
      email: element.email
    })
    this.selectedElment = element.uuid;
   }

   addResponse() {
    const newResonse = {
      libelle: this.newsletterForm.get('libelle')?.value,
      contenu: this.newsletterForm.get('contenu')?.value,
      email: this.newsletterForm.get('email')?.value,
    }
    this.newsLetterService.addNewsletter(newResonse).subscribe((response: any) =>{
      console.log('voir reposeback����', response)
      this.newsletterForm.reset();
      if(response.status!== 200) {
        throw new Error('Ajout non realise')
      }
    })
    }

  allNewsletterData: any[]=[];
  getAllNewsletter(): void{
    this.loadinData  = true;
    this.newsLetterService.getAllNewsLetter().subscribe((respose: any)=> {
      this.allNewsletterData = respose.data;
      this.loadinData = false;
      console.log('voir mes news',this.allNewsletterData);
    })
  }
}
