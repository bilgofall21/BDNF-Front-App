import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  providers:[AuthService],
})
export class ProfilComponent implements OnInit {

  registerProfil = {
    prenom: '',
    nom: '',
    email: '',
    password: '',
    photo: ''
  }



  constructor(private authService : AuthService, private fb: FormBuilder)
  {
    this.profilForm = fb.group({
      prenom: ['', Validators.required],
      nom : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      photo: [null]

    })
  }
  profilForm : FormGroup
  profilId: any;
  ngOnInit(): void {
    this.showProfil();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerProfil.photo = file;
    }
  }


dataProfil: any= [];
  showProfil(): void{
    this.authService.getProfil().subscribe((data : any) =>{
      this.dataProfil = data
      this.profilId = data.id
      console.log('✅✅✅', this.dataProfil)
    })
  }

  modifierProfil() {
    let formData = new FormData();
    formData.append('prenom', this.registerProfil.prenom);
    formData.append('nom', this.registerProfil.nom);
    formData.append('email', this.registerProfil.email);
    formData.append('password', this.registerProfil.password);

    if (this.registerProfil.photo) {
      formData.append('photo', this.registerProfil.photo);
    }



    const formDataEntries = formData as any;

    // Pour déboguer les valeurs de FormData
    for (let [key, value] of formDataEntries.entries()) {
      console.log(`${key}:`, value);
  }
   const newProfil = {
      prenom: this.registerProfil.prenom,
      nom: this.registerProfil.nom,
      email: this.registerProfil.email,
      password: this.registerProfil.password,
    }

    // Appeler le service pour mettre à jour le profil
    this.authService.updateProfil(newProfil).subscribe({
      next: (response) => {
        console.log('Profil mis à jour avec succès', response);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    });
  }

}
