import { Component, OnInit } from '@angular/core';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TemoignageService } from '../../../services/temoigna-service/temoignage.service';

@Component({
  selector: 'app-detail-realisation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-realisation.component.html',
  styleUrl: './detail-realisation.component.css'
})
export class DetailRealisationComponent implements OnInit {
  constructor(
    private realisationService : RealisationService, private activeRoute: ActivatedRoute, private router: Router,
    private temoignageService: TemoignageService
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.realisation_uuid = params['uuid'];
      this.gatRealisationById();
    })
    this.gatRealisationById();
    this.allTemoignage();
  }
  dataRealisationData : any= [];
  realisation_uuid : any;
  gatRealisationById(): void{
    this.realisation_uuid =  this.activeRoute.snapshot.params['uuid'];
    console.log('realisation uuid', this.realisation_uuid);
    this.realisationService.getRealisationById( this.realisation_uuid).subscribe((response: any)=>{
      console.log('voir la realisation', response);
      this.dataRealisationData = response.data;
      this.dataRealisationData = response.data;
    })
  }
  navigateToLinkeDin(): void {
    window.open('https://www.linkedin.com/in/ndeye-diama-niang?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
  }
  getRealisationImage(realisa: any) {
    // Utilisez une expression régulière pour extraire le chemin relatif correct
    const relativePath = realisa.image.replace(/^.*public\//, '');
    return `https://bdnf-api.terangacode.com/public/${relativePath}`;
}
temoignageData: any[]=[];
lastTwoTemoignage: any[] = [];
allTemoignage(): void {
//  this.loadingData = true;
 this.temoignageService.allTemoignage().subscribe((response: any) => {
  //  this.loadingData = false;
   this.temoignageData = response.data;
   console.log("All temoignage", this.temoignageData);
   const lastTemoignage = this.temoignageData.sort((a: {created_at: string | number | Date}, b: {created_at: string | number | Date}) =>{
     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
   })
   this. lastTwoTemoignage = lastTemoignage.slice(0, 2);
   console.log("Liste des 4 temoignages", this. lastTwoTemoignage)

 })
}

}
