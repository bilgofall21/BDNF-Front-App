import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { HeaderComponent } from "../../user/component/header/header.component";
import { HeaderAdminComponent } from "../layout/header-admin/header-admin.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, HeaderAdminComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
