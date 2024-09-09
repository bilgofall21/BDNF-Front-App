import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addIcons } from "ionicons";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent  {
constructor(
  private authService : AuthService,
  private router : Router,
  private toastrService: ToastrService,
  private fb: FormBuilder

){
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

loadingLogin = false;
loginForm : FormGroup
  showConnexion = true;
  showRegister = false;

  registerData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    photo: '',
  }
  formData = {
    email:'',
    password:'',
  }
  userfoundid = '';
  public image:any;

  afficherSection(view:  string, event: Event){
    event.preventDefault();
    this.showConnexion= view === 'connexion';
    this.showRegister = view === 'register';
  }
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image= event.target.files[0] as File ;
  }
  registerAdmin():void{
    console.log("✅✅ donee saisie",this.registerData)
    let formData = new FormData();
    formData.append('nom', this.registerData.nom);
    formData.append('prenom', this.registerData.prenom);
    formData.append('email', this.registerData.email);
    formData.append('password', this.registerData.password);
    formData.append('photo', this.image);

    console.log("✅✅✅", formData)

    this.authService.registerAdmin(formData).subscribe((response: any) =>{
      console.log('inscription reussi',response);
      this.loadingLogin  = false
    })
  }

  // loginAdmin(){
  //   const loginUser = {
  //     email: this.formData.email,
  //     password: this.formData.password
  //   }

  //   try {
  //     this.authService.loginAdmin(loginUser).subscribe((user: any)=>{
  //       console.log('voir objet', user)
  //       localStorage.setItem('access_token', user.access_token);
  //       this.toastrService.success('Connexion réussie', 'Connexion');
  //       if(user.access_token){
  //         this.authService.setLoggedIn(true);
  //         this.router.navigate(['admin/home-admin'])

  //       }
  //   console.log('voir utilisateur', user)

  //     })
  //   } catch (error) {
  //     console.error(error)

  //   }


  // }

  loginAdmin() {
    if (this.loginForm.invalid) {
      this.toastrService.error('Veuillez vérifier les champs', 'Erreur');
      return;
    }

    const loginUser = this.loginForm.value;
this.loadingLogin = true;
    this.authService.loginAdmin(loginUser).subscribe(
      (user: any) => {
        if (user && user.access_token) {
          localStorage.setItem('access_token', user.access_token);
          this.authService.setLoggedIn(true);
          this.toastrService.success('Connexion réussie', 'Connexion');
          this.router.navigate(['admin/home-admin']);
          this.loadingLogin = false;
        }
      },
      (error) => {
        this.toastrService.error('Erreur de connexion', 'Erreur');
        console.error('Erreur de connexion :', error);
      }
    );
  }


}
