import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private authService : AuthService, private router : Router
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
    this.authService.logout().subscribe((respons) =>{
      this.authService.setLoggedIn(false);
      this.router.navigate(['admin/login']);
      localStorage.removeItem('access_token');
    })
  }

    isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

}
