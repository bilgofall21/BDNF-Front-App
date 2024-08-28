import { Component } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {

  toggleSidebar() {
    const sideBar = document.querySelector('.sidebar');
    sideBar?.classList.toggle('close');
  }

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
}
