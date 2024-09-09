import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  toogleButton : boolean = false;
  toggleIcon : string = 'bi bi-list';
  afficherMenuToggle(){
  this.toogleButton = !this.toogleButton;
  this.toggleIcon = !this.toogleButton ? 'bi bi-list' : 'bi bi-x';
  }
  closeAll(){
    this.toogleButton = false;
    this.toggleIcon = 'bi bi-x'
  }
}
