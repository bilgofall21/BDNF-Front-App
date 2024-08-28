import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-user-service',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './user-service.component.html',
  styleUrl: './user-service.component.css'
})
export class UserServiceComponent {

}
