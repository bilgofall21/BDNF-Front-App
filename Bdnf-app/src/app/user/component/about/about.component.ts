import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
constructor(
  private router: Router
){}
  ngOnInit(): void {
   this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              window.scrollTo(0, 0);
            }
            // window.scrollTo(0, 0);
          });
  }
}
