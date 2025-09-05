import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { NewsletterService } from '../../services/news-service/newsletter.service';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from '../../anmation/spinner/spinner.component';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [SidebarComponent, DateFormatPipe, FormsModule, ReactiveFormsModule, NgIf, SpinnerComponent, NgFor],
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
    //console.log('Fichier sélectionné :', this.selectedFile);
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
      //console.log('voir reposeback����', response)
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
      //console.log('voir mes news',this.allNewsletterData);
    })
  }


articlesParPage = 8; // Nombre d'articles par page
pageActuelle = 1; // Page actuelle

dataNewslettertrouve : any []=[];
searchNewsletter : string= '';
noSearchResult : string= '';
getArticlesPage(): any[] {
const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
const indexFin = indexDebut + this.articlesParPage;
this.dataNewslettertrouve= this.allNewsletterData.filter((service: {email: string; }) =>
//  service.contenu.toLowerCase().includes(this.searchNewsletter.toLowerCase()) ||
 service.email.toLowerCase().includes(this.searchNewsletter.toLowerCase())
 );
 if(this.searchNewsletter && this.dataNewslettertrouve.length === 0){
   this.noSearchResult = 'Désolé aucun résultat pour votre recherche';
 }else{
   this.noSearchResult = '';
 }
return this.dataNewslettertrouve.slice(indexDebut, indexFin);
}
// Méthode pour générer la liste des pages
get pages(): number[] {
//  const totalPages = Math.ceil(this. allNewsletterData.length / this.articlesParPage);
//   return Array(totalPages).fill(0).map((_, index) => index + 1);
      // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.allNewsletterData ? Math.ceil(this.allNewsletterData.length / this.articlesParPage) : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0 ? Array(totalPages).fill(0).map((_, index) => index + 1) : [];
}

// Méthode pour obtenir le nombre total de pages
get totalPages(): number {
 return Math.ceil(this. allNewsletterData.length / this.articlesParPage);
}
}
