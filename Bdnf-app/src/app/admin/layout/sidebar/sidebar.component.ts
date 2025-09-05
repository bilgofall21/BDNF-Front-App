import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private authService : AuthService, private router : Router, private notificationService: NotificationService
  ){}

  isClosed: boolean = false;
  setActive(event: Event) {
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    sideLinks.forEach(link => link.parentElement?.classList.remove('active'));
    const target = event.target as HTMLElement;
    target.parentElement?.classList.add('active');
  }
  // toggleSidebar() {
  //   const sideBar = document.querySelector('.sidebar');
  //   sideBar?.classList.toggle('close');

  // }

  toggleTheme() {
    const toggler = document.getElementById('theme-toggle') as HTMLInputElement;
    if (toggler.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  handleSearchToggle() {
    const searchForm = document.querySelector('.content nav form');
    const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
    searchForm?.classList.toggle('show');
    if (searchForm?.classList.contains('show')) {
      searchBtnIcon?.classList.replace('bx-search', 'bx-x');
    } else {
      searchBtnIcon?.classList.replace('bx-x', 'bx-search');
    }
  }


  deconnexion(): void {
    this.notificationService.confirmAlert(
      'Êtes vous sur de vouloir vous déconnectez'
    ).then(confirmed =>{
      if(confirmed) {
        this.authService.logout().subscribe((respons) => {
          this.notificationService.successAlert('Bravo', 'Deconnexion réussie')
          this.authService.setLoggedIn(false);
          this.router.navigate(['admin/login']);
          localStorage.removeItem('access_token');
        },
      (error) => {
        console.error('Error during logout:', error);
        this.notificationService.errorAlert( 'Erreur', 'Une erreur est survenue lors de la déconnexion'  );
      });
      }else{
        //console.log('Déconnexion annulée');
        this.notificationService.warningAlert( 'Echec', 'Déconnexion annulée'  );
      }
    })
  }

    isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

}
