import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemoignageService } from '../../services/temoigna-service/temoignage.service';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../anmation/spinner/spinner.component';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-temoignage',
  standalone: true,
  imports: [FormsModule, HttpClientModule, SidebarComponent, SpinnerComponent, DateFormatPipe, NgFor],
  templateUrl: './temoignage.component.html',
  styleUrl: './temoignage.component.css',
  providers: [TemoignageService]
})
export class TemoignageComponent  implements OnInit{
  temoignageData: any;
  elementSelectionner: any;
  constructor(private temoignageService : TemoignageService, private notificationService: NotificationService, private toastrService: ToastrService){}
  ngOnInit(): void {
  this.showAllTemoignage();
  }
nomClient: any;
contenue: any;
loadinData : boolean = false;



showAllTemoignage(){
  this.loadinData = true;
  this.temoignageService.allTemoignage().subscribe((data: any) =>{
this.temoignageData = data.data
this.loadinData = false;
console.log( '❤️❤️❤️❤️❤️❤️ ', this.temoignageData)
  })
}

ajouterTemoignage(): void{
  const newTemoignage = {
    nomClient : this.nomClient,
    contenue : this.contenue
  }
  this.notificationService.confirmAlert(
    'Voulez-vous vraiment ajouter ce témoignage'
  ).then(confirmed =>{
    if(confirmed){
      this.temoignageService.addTemoignage(newTemoignage).subscribe((data: any) => {
        this.toastrService.success('Témoignage ajouté avec succée')
        console.log("temignega ajoute",data);
        this.showAllTemoignage();
        this.nomClient = '';
        this.contenue  = '';
      },
    (error) =>{
      console.error('Erreur lors de l\'ajout du témoignage',error)
        this.toastrService.error('Erreur lors de l\'ajout du témoignage')
    });
    } else{
      this.toastrService.warning('Ajout du témoignage annulé');
      this.nomClient = '';
      this.contenue  = '';
    }
  });
}

temoignageSelected: any;

getDetailTemoignage(temoignage: any): void {
  this.temoignageSelected = temoignage;
}

annuler(): void {
  this.temoignageSelected = null;
  this.nomClient = '';
  this.contenue  = '';
}

supprimerTemoignage(uuid: any){
  this.notificationService.confirmAlert(
    'Voulez-vous vraiment supprimer ce témoignage'
  ).then(confirmed => {
    if(confirmed){
      this.temoignageService.deleteTemoignage(uuid).subscribe((response : any) =>{
        this.toastrService.success('Témoignage supprimé avec succée')
        console.log("voir element supprimer", response)
        this.showAllTemoignage();
      },
      (error) =>{
        console.error('Erreur lors de la suppression de ce témoignage',error)
        this.toastrService.error('Erreur lors de la suppression de ce témoignage')
      }
    )
    } else{
      this.toastrService.warning('Suppression du témoignage annulée');
    }
  })

}

loadTemoignage(temoignage: any){
  this.elementSelectionner = temoignage.uuid;
  this.nomClient = temoignage.nomClient;
  this.contenue = temoignage.contenue;
    }

    modifierTemoignage(){
      const updatedData = {
            nomClient: this.nomClient,
            contenue: this.contenue
          }
          this.notificationService.confirmAlert(
            'Voulez-vous vraiment modifier ce témoignage'
          ).then(confirmed => {
            if(confirmed){
              this.temoignageService.updateTemoignage(updatedData, this.elementSelectionner).subscribe((response : any) =>{
                this.toastrService.success('Témoignage modifié avec succès')
                console.log("voir element modifie", response);
                this.showAllTemoignage();
              },
              (error) =>{
                console.error('Erreur lors de la modification de ce témoignage',error)
                this.toastrService.error('Erreur lors de la modification de ce témoignage')
              }
            )
            } else{
              this.toastrService.warning('Modification du témoignage annulée');
            }
          })

    }

    articlesParPage = 4; // Nombre d'articles par page
pageActuelle = 1; // Page actuelle

dataTemoignagetrouve : any []=[];
searchTemoignage : string= '';
noSearchResult : string= '';
getArticlesPage(): any[] {
const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
const indexFin = indexDebut + this.articlesParPage;
this.dataTemoignagetrouve= this.temoignageData.filter((service: { nomClient: string; contenue: string; }) =>
 service.nomClient.toLowerCase().includes(this.searchTemoignage.toLowerCase()) ||
 service.contenue.toLowerCase().includes(this.searchTemoignage.toLowerCase())
 );
 if(this.searchTemoignage && this.dataTemoignagetrouve.length === 0){
   this.noSearchResult = 'Désolé aucun résultat pour votre recherche';
 }else{
   this.noSearchResult = '';
 }
return this.dataTemoignagetrouve.slice(indexDebut, indexFin);
}
// Méthode pour générer la liste des pages
get pages(): number[] {
//  const totalPages = Math.ceil(this. temoignageData.length / this.articlesParPage);
//   return Array(totalPages).fill(0).map((_, index) => index + 1);
      // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.temoignageData ? Math.ceil(this.temoignageData.length / this.articlesParPage) : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0 ? Array(totalPages).fill(0).map((_, index) => index + 1) : [];
}

// Méthode pour obtenir le nombre total de pages
get totalPages(): number {
 return Math.ceil(this. temoignageData.length / this.articlesParPage);
}


}
