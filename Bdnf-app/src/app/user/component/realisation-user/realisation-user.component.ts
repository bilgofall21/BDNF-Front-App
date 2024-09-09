import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-realisation-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor],
  templateUrl: './realisation-user.component.html',
  styleUrl: './realisation-user.component.css'
})
export class RealisationUserComponent implements OnInit {

  constructor(private realisationService: RealisationService){}
  ngOnInit(): void {
    this.allRealisation();
  }

  dataRealisation: any[] = [];
  allRealisation(): void {
    this.realisationService.gatAllRealisation().subscribe((data: any)=>{
      this.dataRealisation = data.data;
      console.log("😁✅Rea",this.dataRealisation)

    })
  }

  // pagination and search

   // Attribut pour la pagination
   articlesParPage = 6; // Nombre d'articles par page
   pageActuelle = 1; // Page actuelle

dataRealisationtrouve : any []=[];
searchRealisation : string= '';
getArticlesPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
  const indexFin = indexDebut + this.articlesParPage;
  this.dataRealisationtrouve= this.dataRealisation.filter((service: { titre: string; description: string; }) =>
    service.titre.toLowerCase().includes(this.searchRealisation.toLowerCase()) ||
    service.description.toLowerCase().includes(this.searchRealisation.toLowerCase())
    );
  return this.dataRealisationtrouve.slice(indexDebut, indexFin);
}
   // Méthode pour générer la liste des pages
   get pages(): number[] {
    const totalPages = Math.ceil(this. dataRealisation.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this. dataRealisation.length / this.articlesParPage);
  }

}
