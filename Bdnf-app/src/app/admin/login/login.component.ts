import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
constructor(
  private authService : AuthService,
  private router : Router
){}
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
      console.log('inscription reussi',response)
    })
  }

  loginAdmin(){
    const loginUser = {
      email: this.formData.email,
      password: this.formData.password
    }

    try {
      this.authService.loginAdmin(loginUser).subscribe((user: any)=>{
        console.log('voir objet', user)
        localStorage.setItem('access_token', user.access_token);
        if(user.access_token){
          this.authService.setLoggedIn(true);
          this.router.navigate(['admin/home-admin'])

        }
    console.log('voir utilisateur', user)

      })
    } catch (error) {
      console.error(error)

    }


  }



}
