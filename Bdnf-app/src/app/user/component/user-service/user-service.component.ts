import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ServiceService } from '../../../services/services-service/service.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';
import { NavigationEnd, Router } from '@angular/router';
import { Service } from '../../../models/service.model';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user-service',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    NgFor,
    SpinnerComponent,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './user-service.component.html',
  styleUrl: './user-service.component.css',
})
export class UserServiceComponent implements OnInit {
  constructor(private serviceService: ServiceService, private router: Router) {}
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
  loadingData: boolean = false;
  allService(): void {
    this.loadingData = true;
    this.serviceService.allService().subscribe((response) => {
      this.dataService = response.data;
      this.loadingData = false;
      //console.log('dataService', this.dataService);
    });
  }

  articlesParPage = 6; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  dataServicetrouve: any[] = [];
  searchService: string = '';

  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    this.dataServicetrouve = this.dataService.filter(
      (service: { nomService: string; descriptionService: string }) =>
        service.nomService
          .toLowerCase()
          .includes(this.searchService.toLowerCase()) ||
        service.descriptionService
          .toLowerCase()
          .includes(this.searchService.toLowerCase())
    );
    return this.dataServicetrouve.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    //  const totalPages = Math.ceil(this. dataService.length / this.articlesParPage);
    //   return Array(totalPages).fill(0).map((_, index) => index + 1);
    // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.dataService
      ? Math.ceil(this.dataService.length / this.articlesParPage)
      : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0
      ? Array(totalPages)
          .fill(0)
          .map((_, index) => index + 1)
      : [];
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.dataService.length / this.articlesParPage);
  }


  // =================================================================

  hoveredService: Service | null = null;
  isModalVisible = false;
  modalPosition = { x: 0, y: 0 };
  private hideTimeout: any;

  showModal(service: Service, event: MouseEvent) {
    // alert("ok")
    clearTimeout(this.hideTimeout);

    this.hoveredService = service;

    console.log('Service survolé:', service);

    // Position du modal près du curseur
    const offset = 20;
    let x = event.clientX + offset;
    let y = event.clientY + offset;

    // Empêcher le modal de sortir de l'écran
    const modalWidth = 350;
    const modalHeight = 300; // Estimation

    if (x + modalWidth > window.innerWidth) {
      x = event.clientX - modalWidth - offset;
    }

    if (y + modalHeight > window.innerHeight) {
      y = window.innerHeight - modalHeight - offset;
    }

    this.modalPosition = { x, y };

    // Petit délai pour une meilleure UX
    setTimeout(() => {
      this.isModalVisible = true;
    }, 200);
  }

  hideModal() {
    // Délai avant de cacher pour éviter le clignotement
    this.hideTimeout = setTimeout(() => {
      this.isModalVisible = false;
      setTimeout(() => {
        this.hoveredService = null;
      }, 200);
    }, 100);
  }


}


