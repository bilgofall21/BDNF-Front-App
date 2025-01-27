import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ServiceService } from '../../../services/services-service/service.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';

@Component({
  selector: 'app-user-service',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, SpinnerComponent],
  templateUrl: './user-service.component.html',
  styleUrl: './user-service.component.css'
})
export class UserServiceComponent implements OnInit {
  constructor(private serviceService: ServiceService,){}
  ngOnInit(): void {
    this.allService();
  }
  dataService: any[]= [];
  loadingData : boolean =  false;
  allService(): void {
    this.loadingData = true;
    this.serviceService.allService().subscribe((response)=> {
      this.dataService = response.data;
      this.loadingData = false;
      console.log('dataService', this.dataService);
    })
  }

  articlesParPage = 6; // Nombre d'articles par page
pageActuelle = 1; // Page actuelle

dataServicetrouve : any []=[];
searchService : string= '';

getArticlesPage(): any[] {
const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
const indexFin = indexDebut + this.articlesParPage;
this.dataServicetrouve= this.dataService.filter((service: { nomService: string; descriptionService: string; }) =>
 service.nomService.toLowerCase().includes(this.searchService.toLowerCase()) ||
 service.descriptionService.toLowerCase().includes(this.searchService.toLowerCase())
 );
return this.dataServicetrouve.slice(indexDebut, indexFin);
}
// Méthode pour générer la liste des pages
get pages(): number[] {
//  const totalPages = Math.ceil(this. dataService.length / this.articlesParPage);
//   return Array(totalPages).fill(0).map((_, index) => index + 1);
      // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.dataService ? Math.ceil(this.dataService.length / this.articlesParPage) : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0 ? Array(totalPages).fill(0).map((_, index) => index + 1) : [];
}

// Méthode pour obtenir le nombre total de pages
get totalPages(): number {
 return Math.ceil(this. dataService.length / this.articlesParPage);
}

}
