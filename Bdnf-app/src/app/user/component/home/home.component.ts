import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ArticleService } from '../../../services/article-service/article.service';
import { RouterLink ,Router, NavigationEnd} from '@angular/router';
import { ServiceService } from '../../../services/services-service/service.service';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { DateFormatPipe } from "../../../pipes/date-format.pipe";
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';
import { NgStyle } from '@angular/common';
import { NewsletterService } from '../../../services/news-service/newsletter.service';
import { ToastComponent } from '../../../anmation/toast/toast.component';
import { FormsModule } from '@angular/forms';
import { TemoignageService } from '../../../services/temoigna-service/temoignage.service';
import { ParagraphPipe } from '../../../pipes/paragraph.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Service } from '../../../models/service.model';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    DateFormatPipe,
    TimeAgoPipe,
    NgStyle,
    ToastComponent,
    FormsModule,
    ParagraphPipe,
  ],
   animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private serviceService: ServiceService,
    private realisationSerice: RealisationService,
    private newsletterService: NewsletterService,
    private temoignageService: TemoignageService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.allService();
    this.allArticle();
    this.allRealisation();
    this.allTemoignage();
  }
  @ViewChild('ToastComponent') toast?: ToastComponent;

  loadingData: boolean = false;
  email = '';
  servicaData: any[] = [];

  lastFourService: any[] = [];

  navigateToLinkeDin(): void {
    window.open(
      'https://www.linkedin.com/in/ndeye-diama-niang?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      '_blank'
    );
  }

  addNewsletter(): void {
    const myEmail = {
      email: this.email,
    };
    this.newsletterService.addNewsletter(myEmail).subscribe((response: any) => {
      //console.log("voir le nws", response);
      this.toast?.showToast('Inscription aux newsletter réussi');

      this.email = '';
    });
  }
  getArticleImage(article: any) {
    // Utilisez une expression régulière pour extraire le chemin relatif correct
    const relativePath = article.image.replace(/^.*public\//, '');
    return `https://bdnf-api.terangacode.com/public/${relativePath}`;
  }
  getRealisationImageOld(realisa: any) {
    // Utilisez une expression régulière pour extraire le chemin relatif correct
    const relativePath = realisa.image.replace(/^.*public\//, '');
    return `https://bdnf-api.terangacode.com/public/${relativePath}`;
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
  // navigateToLinkeDin(): void {
  //   window.open('https://www.linkedin.com/company/votre-entreprise', '_blank');
  // }

  /**
   * Obtient la classe CSS pour le background
   */
  getBackgroundStyle(realisa: any): any {
    if (this.isPdf(realisa)) {
      return {
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
  temoignageData: any[] = [];
  lastFourTemoignage: any[] = [];
  allTemoignage(): void {
    this.loadingData = true;
    this.temoignageService.allTemoignage().subscribe((response: any) => {
      this.loadingData = false;
      this.temoignageData = response.data;
      //console.log("All temoignage", this.temoignageData);
      const lastTemoignage = this.temoignageData.sort(
        (
          a: { created_at: string | number | Date },
          b: { created_at: string | number | Date }
        ) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );
      this.lastFourTemoignage = lastTemoignage.slice(0, 4);
      //console.log("Liste des 4 temoignages", this. lastFourTemoignage)
    });
  }
  allService(): void {
    this.loadingData = true;
    this.serviceService.allService().subscribe((data: any) => {
      this.loadingData = false;
      this.servicaData = data.data;
      //console.log("✅✅Service",this.servicaData)
      const lastService = this.servicaData.sort(
        (
          a: { created_at: string | number | Date },
          b: { created_at: string | number | Date }
        ) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );
      this.lastFourService = lastService.slice(0, 3);
      //console.log("😁😁😁",this.lastFourService)
    });
  }
  dataRealisation: any[] = [];
  // lastFourRealisation: any[] = [];
  allRealisation(): void {
    this.loadingData = true;
    this.realisationSerice.gatAllRealisation().subscribe((data: any) => {
      this.loadingData = false;
      this.dataRealisation = data.data;
      const lastRealisation = this.dataRealisation.sort(
        (
          a: { created_at: string | number | Date },
          b: { created_at: string | number | Date }
        ) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );
      this.lastFourRealisation = lastRealisation.slice(0, 3);
    });
  }

  allArticleData: any[] = [];
  lastFourArticel: any[] = [];
  // allArticle(): void{
  // this.articleService.allArticle().subscribe((data)=> {
  //   this.allArticleData = data.data

  //   const lastArticle = this.allArticleData.sort((a: {created_at: string | number | Date}, b: {created_at: string | number | Date})=>{
  //     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  //   })
  //   this.lastFourArticel = lastArticle.slice(0, 4)
  //   //console.log('step article 🤣🤣', this.lastFourArticel)
  // })
  // }
  allArticle(): void {
    this.loadingData = true;
    this.articleService.allArticle().subscribe((data) => {
      this.allArticleData = data.data.map((article: any) => {
        // article.image = `https://api.bdnf-marketing-solutions.com/public${article.image}`;
        return article;
      });
      const lastArticle = this.allArticleData.sort(
        (
          a: { created_at: string | number | Date },
          b: { created_at: string | number | Date }
        ) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );
      this.lastFourArticel = lastArticle.slice(0, 1);
      this.loadingData = false;
      //console.log('step article 🤣🤣', this.lastFourArticel);
    });
  }

  // date depuis sa cration
  // getTimeSinceCreation(dateString: string): string {
  //   const createdDate = new Date(dateString);
  //   const currentDate = new Date();
  //   const timeDifference = currentDate.getTime() - createdDate.getTime();

  //   const minutes = Math.floor(timeDifference / (1000 * 60));
  //   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  //   const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  //   const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
  //   const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
  //   const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

  //   if (years > 0) {
  //     return years === 1 ? '1 an' : `${years} ans`;
  //   } else if (months > 0) {
  //     return months === 1 ? '1 mois' : `${months} mois`;
  //   } else if (weeks > 0) {
  //     return weeks === 1 ? '1 semaine' : `${weeks} semaines`;
  //   } else if (days > 0) {
  //     return days === 1 ? '1 jour' : `${days} jours`;
  //   } else if (hours > 0) {
  //     return hours === 1 ? '1 heure' : `${hours} heures`;
  //   } else if (minutes > 0) {
  //     return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  //   } else {
  //     return 'À l\'instant';
  //   }
  // }

  letsFo(id: any, event: Event): void {
    event.preventDefault();
    this.router.navigate(['/blog', id]);
    //console.log("✅✅✅")
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




