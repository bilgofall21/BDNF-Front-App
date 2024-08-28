import { Component } from '@angular/core';
import { ServiceComponent } from "../service/service.component";
import { SidebarComponent } from "../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [ServiceComponent, SidebarComponent],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent {

}
