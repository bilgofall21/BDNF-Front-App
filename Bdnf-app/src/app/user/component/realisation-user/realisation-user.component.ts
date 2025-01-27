import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgStyle } from '@angular/common';
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';

@Component({
  selector: 'app-realisation-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgStyle, SpinnerComponent],
  templateUrl: './realisation-user.component.html',
  styleUrl: './realisation-user.component.css'
})
export class RealisationUserComponent implements OnInit {

  constructor(private realisationService: RealisationService){}
  ngOnInit(): void {
    this.allRealisation();
  }
  loadingData : boolean =  false;
  dataRealisation: any[] = [];
  allRealisation(): void {
    this.loadingData = true;
    this.realisationService.gatAllRealisation().subscribe((data: any)=>{
      this.dataRealisation = data.data;
      this.loadingData = false;
      console.log("😁✅Rea",this.dataRealisation)

    })
  }

  // pagination and search

   // Attribut pour la pagination
   articlesParPage = 6; // Nombre d'articles par page
   pageActuelle = 1; // Page actuelle

dataRealisationtrouve : any []=[];
searchRealisation : string= '';
noResultsMessage: string = '';
getArticlesPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
  const indexFin = indexDebut + this.articlesParPage;
  this.dataRealisationtrouve= this.dataRealisation.filter((service: { titre: string; description: string; }) =>
    service.titre.toLowerCase().includes(this.searchRealisation.toLowerCase()) ||
    service.description.toLowerCase().includes(this.searchRealisation.toLowerCase())
    );
    if(this.searchRealisation && this.dataRealisationtrouve.length === 0){
      this.noResultsMessage = 'Désolé aucun résultat trouvé pour votre recherche';
    }else{
      this.noResultsMessage = '';
    }
  return this.dataRealisationtrouve.slice(indexDebut, indexFin);
}
   // Méthode pour générer la liste des pages
   get pages(): number[] {
    // const totalPages = Math.ceil(this. dataRealisation.length / this.articlesParPage);
    //  return Array(totalPages).fill(0).map((_, index) => index + 1);
         // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.dataRealisation ? Math.ceil(this.dataRealisation.length / this.articlesParPage) : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0 ? Array(totalPages).fill(0).map((_, index) => index + 1) : [];
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this. dataRealisation.length / this.articlesParPage);
  }

}
