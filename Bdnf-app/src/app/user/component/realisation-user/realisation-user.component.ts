import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgStyle } from '@angular/common';
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { NavigationEnd, Router, RouterLink,ActivatedRoute } from '@angular/router';
import { ParagraphPipe } from '../../../pipes/paragraph.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-realisation-user',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    NgFor,
    NgStyle,
    SpinnerComponent,
    DateFormatPipe,
    RouterLink,
    ParagraphPipe,
  ],
  templateUrl: './realisation-user.component.html',
  styleUrl: './realisation-user.component.css',
})
export class RealisationUserComponent implements OnInit {
  constructor(
    private realisationService: RealisationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
      // window.scrollTo(0, 0);
    });
    this.allRealisation();
  }
  loadingData: boolean = false;
  dataRealisation: any[] = [];
  allRealisation(): void {
    this.loadingData = true;
    this.realisationService.gatAllRealisation().subscribe((data: any) => {
      this.dataRealisation = data.data;
      this.loadingData = false;
      //console.log("😁✅Rea",this.dataRealisation)
    });
  }

  // pagination and search

  // Attribut pour la pagination
  articlesParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  dataRealisationtrouve: any[] = [];
  searchRealisation: string = '';
  noResultsMessage: string = '';
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    this.dataRealisationtrouve = this.dataRealisation.filter(
      (service: { titre: string; description: string }) =>
        service.titre
          .toLowerCase()
          .includes(this.searchRealisation.toLowerCase()) ||
        service.description
          .toLowerCase()
          .includes(this.searchRealisation.toLowerCase())
    );
    if (this.searchRealisation && this.dataRealisationtrouve.length === 0) {
      this.noResultsMessage =
        'Désolé aucun résultat trouvé pour votre recherche';
    } else {
      this.noResultsMessage = '';
    }
    return this.dataRealisationtrouve.slice(indexDebut, indexFin);
  }

  // getRealisationImage(realisa: any) {
  //   // Utilisez une expression régulière pour extraire le chemin relatif correct
  //   const relativePath = realisa.image.replace(/^.*public\//, '');
  //   return `https://bdnf-api.terangacode.com/public/${relativePath}`;
  // }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    // const totalPages = Math.ceil(this. dataRealisation.length / this.articlesParPage);
    //  return Array(totalPages).fill(0).map((_, index) => index + 1);
    // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.dataRealisation
      ? Math.ceil(this.dataRealisation.length / this.articlesParPage)
      : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0
      ? Array(totalPages)
          .fill(0)
          .map((_, index) => index + 1)
      : [];
  }

  dataRealisationData: any;
  lastFourRealisation: any[] = [];
  lastTwoTemoignage: any[] = [];
  // loadingData: boolean = false;

  // Pour le viewer PDF
  selectedPdfTitle: string = '';
  currentPdfUrl: string = '';
  safePdfUrl: SafeResourceUrl | null = null;
  showPdfModal: boolean = false;

  // constructor(
  //   private sanitizer: DomSanitizer,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   // Votre logique d'initialisation
  // }

  /**
   * Récupère l'URL complète de l'image/PDF
   */
  getRealisationImage(realisa: any): string {
    if (!realisa || !realisa.image) return '';
    const relativePath = realisa.image.replace(/^.*public\//, '');
    return `https://bdnf-api.terangacode.com/public/${relativePath}`;
  }

  /**
   * Détermine si le fichier est une image ou un PDF
   */
  getFileType(realisa: any): 'image' | 'pdf' {
    if (!realisa || !realisa.image) return 'image';
    const extension = realisa.image.split('.').pop()?.toLowerCase();
    return extension === 'pdf' ? 'pdf' : 'image';
  }

  /**
   * Vérifie si la réalisation est un PDF
   */
  isPdf(realisa: any): boolean {
    return this.getFileType(realisa) === 'pdf';
  }

  /**
   * Ouvre le viewer PDF dans une modal
   */
  openPdfViewer(realisa: any): void {
    this.selectedPdfTitle = realisa.titre;
    this.currentPdfUrl = this.getRealisationImage(realisa);
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.currentPdfUrl
    );
    this.showPdfModal = true;

    // Si vous utilisez Bootstrap
    setTimeout(() => {
      const modalElement = document.getElementById('pdfViewerModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  }

  /**
   * Ferme le viewer PDF
   */
  closePdfViewer(): void {
    this.showPdfModal = false;
    this.safePdfUrl = null;
  }

  /**
   * Ouvre le PDF dans un nouvel onglet
   */
  openPdfInNewTab(realisa: any): void {
    const url = this.getRealisationImage(realisa);
    window.open(url, '_blank');
  }

  /**
   * Télécharge le PDF
   */
  downloadPdf(realisa: any): void {
    const url = this.getRealisationImage(realisa);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${realisa.titre}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Gère les erreurs de chargement d'image
   */
  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder.jpg';
  }

  /**
   * Navigation vers la page de détails
   */
  navigateToDetail(realisa: any): void {
    if (this.isPdf(realisa)) {
      // Pour les PDFs, on peut soit ouvrir le viewer, soit naviguer vers la page de détails
      this.router.navigate(['/detail-realisation', realisa.uuid]);
    } else {
      this.router.navigate(['/detail-realisation', realisa.uuid]);
    }
  }

  /**
   * Navigation vers LinkedIn
   */
  navigateToLinkeDin(): void {
    window.open('https://www.linkedin.com/company/votre-entreprise', '_blank');
  }

  /**
   * Obtient la classe CSS pour le background
   */
  getBackgroundStyle(realisa: any): any {
    if (this.isPdf(realisa)) {
      return {
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // background: 'linear-gradient(135deg, #a12825 0%, #7a1c1a 100%)',
        background: 'linear-gradient(135deg, #a12825 0%, #d9442c 100%)',


        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      };
    }
    return {
      'background-image': `url(${this.getRealisationImage(realisa)})`,
      'background-size': 'cover',
      'background-position': 'center',
    };
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.dataRealisation.length / this.articlesParPage);
  }
}
