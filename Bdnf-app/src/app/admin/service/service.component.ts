import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/services-service/service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [FormsModule, HttpClientModule, SidebarComponent],
  providers: [ServiceService],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit  {
  constructor(
    private servicesService: ServiceService
  ){}
  ngOnInit(): void {
    this.showAllService();
  }

  nomService ='';
  descriptionService = '';
  elementSelectionner : any;

serviceData : any;

  showAllService(){
    this.servicesService.allService().subscribe((data: any) =>{
this.serviceData = data.data
console.log(this.serviceData)
    })
  }
  ajouterService(){
    const newService = {
      nomService: this.nomService,
      descriptionService: this.descriptionService
    }
    try {
      this.servicesService.addService(newService).subscribe((data : any) =>{
        console.log('Service ajouté avec succès', data);
        console.log('voir ajout',newService )
        this.showAllService();
      })
    } catch (error) {
      console.error('Erreur lors de l\'ajout du service:', error);
    }

  }
  supprimerSerice(id: any){
    this.servicesService.deleteService(id).subscribe((response : any) =>{
      console.log("voir element supprimer", response)
      this.showAllService();
    })
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
    return this.servicesService.updateService( updatedData, this.elementSelectionner).subscribe((response : any) =>{
      console.log("voir element modifie", response);
      this.showAllService();
    })
  }

}
