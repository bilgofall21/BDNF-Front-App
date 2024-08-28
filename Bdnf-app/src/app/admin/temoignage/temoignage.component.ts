import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemoignageService } from '../../services/temoigna-service/temoignage.service';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-temoignage',
  standalone: true,
  imports: [FormsModule, HttpClientModule, SidebarComponent],
  templateUrl: './temoignage.component.html',
  styleUrl: './temoignage.component.css',
  providers: [TemoignageService]
})
export class TemoignageComponent  implements OnInit{
  temoignageData: any;
  elementSelectionner: any;
  constructor(private temoignageService : TemoignageService){}
  ngOnInit(): void {
  this.showAllTemoignage();
  }
nomClient: any;
contenue: any;



showAllTemoignage(){
  this.temoignageService.allTemoignage().subscribe((data: any) =>{
this.temoignageData = data.data
console.log(this.temoignageData)
  })
}

ajouterTemoignage(): void{
  const newTemoignage = {
    nomClient : this.nomClient,
    contenue : this.contenue
  }
  this.temoignageService.addTemoignage(newTemoignage).subscribe((data: any) => {
    console.log("temignega ajoute",data);
    this.showAllTemoignage();
  });
}

supprimerTemoignage(uuid: any){
  this.temoignageService.deleteTemoignage(uuid).subscribe((response : any) =>{
    console.log("voir element supprimer", response)
    this.showAllTemoignage();
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
      return this.temoignageService.updateService( updatedData, this.elementSelectionner).subscribe((response : any) =>{
        console.log("voir element modifie", response);
        this.showAllTemoignage();
      })
    }


}
