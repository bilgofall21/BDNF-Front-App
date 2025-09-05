import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { NavigationEnd, Router } from '@angular/router';
import { ServiceService } from '../../../services/services-service/service.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  constructor(private router: Router, private serviceService: ServiceService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
      // window.scrollTo(0, 0);
    });
    this.allService();
  }

  dataService: any[] = [];
  last4Service: any[] = [];
  loadingData: boolean = false;
  allService(): void {
    this.loadingData = true;
    this.serviceService.allService().subscribe((response) => {
      this.dataService = response.data;
      this.last4Service = this.dataService.slice(-4);
      this.loadingData = false;
      console.log('dataService', this.dataService);
    });
  }
}
