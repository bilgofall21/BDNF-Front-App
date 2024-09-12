import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { NewsletterService } from '../../services/news-service/newsletter.service';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [SidebarComponent, DateFormatPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent implements OnInit {
ajoutRealisation() {
throw new Error('Method not implemented.');
}
  constructor(private newsLetterService: NewsletterService){}


 titre: string = '';
 description: string = '';
 public image: any;
  ngOnInit(): void {
    this.realisationForm= new FormGroup({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]) // Contrôle pour l'image
    });
    this.getAllNewsletter();
  }

  realisationForm!: FormGroup

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Fichier sélectionné :', this.selectedFile);
  }

   selectedFile: File | null = null;
   getFile(event: any) {
    // Récupérer le fichier sélectionné
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Fichier sélectionné : ', this.selectedFile);
    } else {
      console.error('Aucun fichier sélectionné');
    }
  }

  allNewsletterData: any[]=[];
  getAllNewsletter(): void{
    this.newsLetterService.getAllNewsLetter().subscribe((respose: any)=> {
      this.allNewsletterData = respose.data;
      console.log('voir mes news',this.allNewsletterData);
    })
  }
}
