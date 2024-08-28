import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealisationService } from '../../services/realisation-service/realisation.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-realisation',
  standalone: true,
  imports: [FormsModule, HttpClientModule, SidebarComponent,ReactiveFormsModule],
  templateUrl: './realisation.component.html',
  styleUrl: './realisation.component.css',
  providers: [RealisationService]
})
export class RealisationComponent {
constructor(private realisationService : RealisationService, private fb: FormBuilder){
  this.realisationForm = this.fb.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    image: [null] // Pour les fichiers, on peut le gérer avec un contrôle de type `File`
  });
}

 titre: string = '';
 description: string = '';
 public image: any;

registerRealisation = {
  titre: '',
  description: '',
  image: '',
}

realisationForm : FormGroup;



   // Fonction pour capturer le fichier sélectionné
  //  getFile(event: any) {
  //   console.warn(event.target.files[0]);
  //   this.image= event.target.files[0] as File ;
  // }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.realisationForm.patchValue({
        image: file
      });
    }
  }


  // getFile(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.image = file;
  //   }
  // }
  // Fonction pour envoyer les données avec le fichier à l'API


  registerData = {
    titre: '',
    description: '',
  }



  errors: any = {};

// registerAdmin(): void {
//   let formData = new FormData();
//   formData.append('titre', this.titre);
//   formData.append('description', this.description);

//   if (this.image) {
//     formData.append('image', this.image);

//     console.log("🍊🍊🍊",this.image)
//   }

//   // console.log('🙏🙏🙏',this)

//   this.realisationService.addRealistion(formData).subscribe({
//     next: (response: any) => {
//       console.log("✅✅✅", formData)
//       // Gestion de la réponse réussie
//       console.log('Inscription réussie', response);
//     },
//     error: (err: any) => {
//       // Traitement des erreurs
//       if (err.error && err.error.errorList) {
//         this.errors = err.error.errorList;
//       }
//     }
//   });
// }


registerAdmin(): void {
  const formData = new FormData();

  // Ajout des champs du formulaire au FormData
  formData.append('titre', this.realisationForm.get('titre')?.value);
  formData.append('description', this.realisationForm.get('description')?.value);

  if (this.realisationForm.get('image')?.value) {
    formData.append('image', this.realisationForm.get('image')?.value);
  }

  this.realisationService.addRealistion(formData).subscribe({
    next: (response: any) => {
      console.log("������", formData.get('image'))
      console.log('Inscription réussie', response);
    },
    error: (err: any) => {
      if (err.error && err.error.errorList) {
        this.errors = err.error.errorList;
      }
    }
  });
}

getFile(event: any) {
  console.warn(event.target.files[0]);
  this.image= event.target.files[0] as File ;
}


ajoutRealisation(){
  let formData  = new FormData();
  formData.append('titre', this.titre || '');
  formData.append('description', this.description || '');
  formData.append('image', this.image)

  // let requestData = {
  //   titre: this.registerData.titre,
  //   description: this.registerData.description,
  //   image: this.image // Assurez-vous que l'image soit bien envoyée si nécessaire
  // };

  console.log("🚨🚨❌❌❌ formData:", formData.get('titre'), formData.get('description'), formData.get('image'));
  // console.log("🚨🚨",this.registerData)

  try {
    this.realisationService.addRealistion(formData).subscribe((response : any)=>{
      console.log('voir reposeback✅✅', response)
    })
  } catch (error) {
    console.error(error, )
  }
}



}
