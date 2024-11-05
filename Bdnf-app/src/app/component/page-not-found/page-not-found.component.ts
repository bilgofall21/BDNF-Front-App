import { Component } from '@angular/core';
import { HeaderComponent } from '../../user/component/header/header.component';
import { FooterComponent } from '../../user/component/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
