import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealisationService } from '../../services/realisation-service/realisation.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { Validators } from '@angular/forms';
import { realisation } from '../../models/realisation';
import { NgFor, NgIf } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ParagraphPipe } from "../../pipes/paragraph.pipe";
import { SpinnerComponent } from '../../anmation/spinner/spinner.component';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-realisation',
  standalone: true,
  imports: [FormsModule, HttpClientModule, SidebarComponent, ReactiveFormsModule, NgIf, NgFor, ParagraphPipe, SpinnerComponent, DateFormatPipe],
  templateUrl: './realisation.component.html',
  styleUrl: './realisation.component.css',
  providers: [RealisationService]
})
export class RealisationComponent implements OnInit {
  realisationForm!: FormGroup ;
  imageURL: boolean = false;
constructor(private realisationService : RealisationService, private sanitizer: DomSanitizer, private fb: FormBuilder, private notificationService: NotificationService,
  private toastrService: ToastrService
){

}
  ngOnInit(): void {
    this.realisationForm= new FormGroup({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]) // Contrôle pour l'image
    });
    this.allRealisation();
  }


  loadinData : boolean = false;

 titre: string = '';
 description: string = '';
 public image: any;




onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  //console.log('Fichier sélectionné :', this.selectedFile);
}

 selectedFile: File | null = null;
 getFile(event: any) {
  // Récupérer le fichier sélectionné
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    //console.log('Fichier sélectionné : ', this.selectedFile);
  } else {
    console.error('Aucun fichier sélectionné');
  }
}
getRealisationImageld(realisa: any) {
  // Utilisez une expression régulière pour extraire le chemin relatif correct
  const relativePath = realisa.image.replace(/^.*public\//, '');
  return `https://bdnf-api.terangacode.com/public/${relativePath}`;
}

  dataRealisation: any[] = [];
  selectedPdfTitle: string = '';
  currentPdfUrl: string = '';
  safePdfUrl: SafeResourceUrl | null = null;

  // constructor(private sanitizer: DomSanitizer) {}

  getRealisationImage(realisa: any): string {
    const relativePath = realisa.image.replace(/^.*public\//, '');
    return `https://bdnf-api.terangacode.com/public/${relativePath}`;
  }

  getFileType(realisa: any): 'image' | 'pdf' {
    const extension = realisa.image.split('.').pop()?.toLowerCase();
    return extension === 'pdf' ? 'pdf' : 'image';
  }

/*************  ✨ Windsurf Command 🌟  *************/
  openPdfViewer(service: any): void {
    this.selectedPdfTitle = service.titre;
    this.currentPdfUrl = this.getRealisationImage(service);
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentPdfUrl);

    // Ouvrir le modal Bootstrap
    const modalElement = document.getElementById('pdfViewerModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
/*******  2efb98a2-6071-43da-8565-262964186690  *******/

  onImageError(event: any): void {
    // Image de fallback en cas d'erreur
    event.target.src = 'assets/images/placeholder.jpg';
  }

  detailRealisation(service: any): void {
    // Si c'est un PDF, ouvrir le viewer au lieu du modal de détails
    if (this.getFileType(service) === 'pdf') {
      this.openPdfViewer(service);
    } else {
      // Votre logique existante pour les images
    }
  }



// dataRealisation: any[] = [];
allRealisation(): void {
  this.loadinData = true;
  this.realisationService.gatAllRealisation().subscribe((reasponse: any) =>{
    this.dataRealisation = reasponse.data;
    this.loadinData = false;
    //console.log("����Rea ❤️❤️❤️ ",this.dataRealisation)

  })
}

realisationSelected: any;

detailRealisationOld(realisation: any): void {
  this.realisationSelected = realisation;
}

ajoutRealisation(){
  const newrea = {
    titre: this.realisationForm.value.titre,
    description: this.realisationForm.value.description,
  }
  this.notificationService.confirmAlert(
    'Voulez-vous vraiment ajoutez cette réalisation'
  ).then(confirmed => {
    if(confirmed){
      try {
        this.realisationService.addRealistion(newrea).subscribe((response : any)=>{
          //console.log('voir reposeback✅✅', response);
          this.toastrService.success('Réalisation ajoutée avec succès')
          this.realisationForm.reset();

          if(this.selectedFile){
            const formData = new FormData();
            formData.append('image', this.selectedFile);
            //console.log('Contenu de FormData avant l\'envoi :', formData.get('image'));
            //console.log('Contenu de FormData avant l\'envoi :', formData);
            this.realisationService.addImageRealisation(response.data.uuid, formData).subscribe((respons)=>{
              //console.log('Image ajoutée avec succes', respons)
              this.allRealisation();
            },(error) =>{
              console.error('Erreur lors de l\'ajout de l\'image', error)
              this.toastrService.error('Erreur lors de l\'ajout de l\'image')
            }
          )
          }
        },(error) =>{
          console.error('Erreur lors de l\'ajout de la réalisation', error)
          this.toastrService.error('Erreur lors de l\'ajout de la réalisation')
        }
      )
      } catch (error) {
        console.error(error, )

      }
    } else{
      this.toastrService.warning('Ajout réalisation annulé');
      this.realisationForm.reset();
    }
  })
}
elementSelectionner : any;

loadRealisation(realisation: any){
  this.realisationForm.patchValue({
    titre: realisation.titre,
    description: realisation.description,
    uuid: realisation.uuid
  });
  this.elementSelectionner = realisation.uuid
  this.imageURL = realisation.image;
    }


    // Méthode de modification avec FormData
modifierRealisa() {
  const formData = new FormData();
  formData.append('titre', this.realisationForm.value.titre);
  formData.append('description', this.realisationForm.value.description);

  // Ajoutez l'image si elle est sélectionnée
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  } else {
    console.error("Image non sélectionnée.");
  }

  this.notificationService.confirmAlert('Voulez-vous vraiment modifier cette réalisation')
    .then(confirmed => {
      if (confirmed) {
        this.realisationService.updateRealisation(formData, this.elementSelectionner).subscribe(
          (response: any) => {
            //console.log('Réalisation modifiée avec succès', response);
            this.toastrService.success('Réalisation modifiée avec succès');
            this.allRealisation();
            this.realisationForm.reset();
          },
          (error) => {
            console.error('Erreur lors de la modification de cette réalisation', error);
            this.toastrService.error('Erreur lors de la modification de cette réalisation');
            this.realisationForm.reset();
          }
        );
      } else {
        this.toastrService.warning('Modification annulée');
        this.realisationForm.reset();
      }
    });
}

annuler(): void {
  this.realisationForm.reset();
  this.selectedFile = null;
  this.imageURL = false;
}



supprimerRealisation(id: any) {
  //console.log('Demande de confirmation pour supprimer le service');
  Swal.fire({
    title: "Voulez-vous vraiment supprimer cette realistation?",
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
      this.realisationService.delatRealisation(id).subscribe((response: any) => {
        //console.log('Réponse de la suppression:', response);
        this.toastrService.success('Realisation Supprimé avec succès');
        this.allRealisation();
      },
      (error) => {
        console.error('Erreur lors de la suppression de cette realisation', error);
        this.toastrService.error('Erreur lors de la suppression de cette realisation');
      });
    } else {
      //console.log('Suppression annulée');
      this.toastrService.warning('Suppression annulée');
    }
  }).catch((error) => {
    console.error('Erreur lors de l\'affichage de l\'alerte', error);
  });
}



articlesParPage = 4; // Nombre d'articles par page
pageActuelle = 1; // Page actuelle

dataRealisationtrouve : any []=[];
searchRealisation : string= '';
noSearchResult : string= '';
getArticlesPage(): any[] {
const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
const indexFin = indexDebut + this.articlesParPage;
this.dataRealisationtrouve= this.dataRealisation.filter((service: { titre: string; description: string; }) =>
 service.titre.toLowerCase().includes(this.searchRealisation.toLowerCase()) ||
 service.description.toLowerCase().includes(this.searchRealisation.toLowerCase())
 );
 if(this.searchRealisation && this.dataRealisationtrouve.length === 0){
   this.noSearchResult = 'Désolé aucun résultat pour votre recherche';
 }else{
   this.noSearchResult = '';
 }
return this.dataRealisationtrouve.slice(indexDebut, indexFin);
}
// Méthode pour générer la liste des pages
get pages(): number[] {
//  const totalPages = Math.ceil(this. dataRealisation.length / this.articlesParPage);
//   return Array(totalPages).fill(0).map((_, index) => index + 1);
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
