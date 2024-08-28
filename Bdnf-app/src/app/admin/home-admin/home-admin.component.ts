import { Component } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}
