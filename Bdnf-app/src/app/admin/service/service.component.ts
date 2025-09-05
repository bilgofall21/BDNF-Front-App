import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/services-service/service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { SpinnerComponent } from '../../anmation/spinner/spinner.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [FormsModule, HttpClientModule, SidebarComponent, NgFor, DateFormatPipe, SpinnerComponent,NgIf],
  providers: [ServiceService],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit  {
  constructor(
    private servicesService: ServiceService, private notificationService: NotificationService, private toastrService: ToastrService
  ){}
  ngOnInit(): void {
    this.showAllService();
  }
  isloadingService = true;
  loadinData : boolean = false;

  nomService ='';
  descriptionService = '';
  elementSelectionner : any;

serviceData: any[]= [];

  showAllService(){
    this.loadinData = true
    this.servicesService.allService().subscribe((data: any) =>{
      this.isloadingService = false;
      //console.log('voir me service 1111✅✅✅✅✅ ',data)
this.serviceData = data.data
this.loadinData = false;
//console.log('voir me service ✅✅✅✅✅ ',this.serviceData)
    })
  }
  ajouterService(){
    const newService = {
      nomService: this.nomService,
      descriptionService: this.descriptionService
    }
    //console.log('voir nesssss', newService)
    this.notificationService.confirmAlert(
      'Voulez-vous vraiment ajouter ce service'
    ).then(confirmed => {
      //console.log('111111111111')
      if(confirmed){
        //console.log('111111111111222222222')
        this.servicesService.addService(newService).subscribe((data : any) =>{
          //console.log('😁😁😁😁😁😁😁', data)
          this.toastrService.success('Service ajouter avec succée')
          this.showAllService();
          this.nomService ='';
          this.descriptionService ='';
        },
        (error) =>{
          console.error('Erreur lors de l\'ajout du service',error)
            this.toastrService.error('erreur lors de l\' ajout du service')
        });

      }else{
        this.toastrService.warning('ajout du service annulé');
        this.annuler();
      }
    })

  }
  supprimerService(id: any) {
    //console.log('Demande de confirmation pour supprimer le service');
    Swal.fire({
      title: "Voulez-vous vraiment supprimer ce service ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#388E3C",
      cancelButtonColor: "#A12825",
      width: 450,
      confirmButtonText: "Oui, Supprimer!",
      padding: 10,
      color: '#ffff',
      background: '#E7DCD6'
    }).then((result) => {
      //console.log('Résultat de l\'alerte:', result);
      if (result.isConfirmed) {
        //console.log('Suppression confirmée');
        this.servicesService.deleteService(id).subscribe((response: any) => {
          //console.log('Réponse de la suppression:', response);
          this.toastrService.success('Service Supprimé avec succès');
          this.showAllService();
        },
        (error) => {
          console.error('Erreur lors de la suppression du service', error);
          this.toastrService.error('Erreur lors de la suppression du service');
        });
      } else {
        //console.log('Suppression annulée');
        this.toastrService.warning('Suppression annulée');
      }
    }).catch((error) => {
      console.error('Erreur lors de l\'affichage de l\'alerte', error);
    });
  }



  loadService(service: any){
this.elementSelectionner = service.uuid;
this.nomService = service.nomService;
this.descriptionService = service.descriptionService;
  }

  modifierService(){
    const updatedData = {
          nomService: this.nomService,
          descriptionService: this.descriptionService
        }
        this.notificationService.confirmAlert('voulez-vous vraiment modifier ce service'
        ).then(confirmed =>{
          if(confirmed){
            this.servicesService.updateService(updatedData, this.elementSelectionner).subscribe((response : any) =>{
              this.toastrService.success('Service modifié avec succès')
              this.showAllService();
              this.nomService ='';
              this.descriptionService ='';
            },
            (error) =>{
              console.error('Erreur lors de la modification du service',error)
              this.toastrService.error('Erreur lors de la modification du service')
            });
          }else{
            this.toastrService.warning('modification annulée');
           this.annuler();
          }
        })

  }
  seriviceSelected: any;
  getDetailService(service: any): void {
    this.seriviceSelected = service;
  }

  annuler(): void {
    this.nomService ='';
    this.descriptionService ='';
    this.elementSelectionner = null;
  }


  // pagination and search

   // Attribut pour la pagination
   articlesParPage = 4; // Nombre d'articles par page
   pageActuelle = 1; // Page actuelle

serviceDatatrouve : any []=[];
searchService : string= '';
noResultSearch : string ='';
getArticlesPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
  const indexFin = indexDebut + this.articlesParPage;
  this.serviceDatatrouve= this.serviceData.filter((service: { nomService: string; descriptionService: string; }) =>
    service.nomService.toLowerCase().includes(this.searchService.toLowerCase()) ||
    service.descriptionService.toLowerCase().includes(this.searchService.toLowerCase())
    );
    if(this.searchService && this.serviceDatatrouve?.length === 0){
      this.noResultSearch = 'Désolé aucun résultat pour votre recherche';
    }else{
      this.noResultSearch = '';
    }
  return this.serviceDatatrouve.slice(indexDebut, indexFin);
}
   // Méthode pour générer la liste des pages
  //  get pages(): number[] {
  //   const totalPages = Math.ceil(this. serviceData?.length / this.articlesParPage);
  //   return Array(totalPages).fill(0).map((_, index) => index + 1);
  // }
  get pages(): number[] {
    // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.serviceData ? Math.ceil(this.serviceData.length / this.articlesParPage) : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0 ? Array(totalPages).fill(0).map((_, index) => index + 1) : [];
  }
  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this. serviceData?.length / this.articlesParPage);
  }

}
