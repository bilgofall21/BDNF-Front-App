import { Component, OnInit } from '@angular/core';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TemoignageService } from '../../../services/temoigna-service/temoignage.service';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-detail-realisation',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    NgClass,
    DateFormatPipe,
  ],
  templateUrl: './detail-realisation.component.html',
  styleUrl: './detail-realisation.component.css',
})
export class DetailRealisationComponent implements OnInit {
  constructor(
    private realisationService: RealisationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private temoignageService: TemoignageService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
      // window.scrollTo(0, 0);
    });
    this.activeRoute.params.subscribe((params) => {
      this.realisation_uuid = params['uuid'];
      this.gatRealisationById();
    });

    this.route.params.subscribe((params) => {
      this.realisationUuid = params['uuid'];
      this.loadRealisationDetail();
    });
    this.gatRealisationById();
    this.allTemoignage();
  }
  loadingData: boolean = false;
  dataRealisationData: any = [];
  realisation_uuid: any;
  gatRealisationById(): void {
    this.realisation_uuid = this.activeRoute.snapshot.params['uuid'];
    //console.log('realisation uuid', this.realisation_uuid);
    this.loadingData = true;
    this.realisationService
      .getRealisationById(this.realisation_uuid)
      .subscribe((response: any) => {
        //console.log('voir la realisation', response);
        this.loadingData = false;
        this.dataRealisationData = response.data;
        this.dataRealisationData = response.data;
      });
  }
  navigateToLinkeDin(): void {
    window.open(
      'https://www.linkedin.com/in/ndeye-diama-niang?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      '_blank'
    );
  }
  // getRealisationImage(realisa: any) {
  //   // Utilisez une expression régulière pour extraire le chemin relatif correct
  //   const relativePath = realisa.image.replace(/^.*public\//, '');
  //   return `https://bdnf-api.terangacode.com/public/${relativePath}`;
  // }
  temoignageData: any[] = [];
  lastTwoTemoignage: any[] = [];
  allTemoignage(): void {
    //  this.loadingData = true;
    this.temoignageService.allTemoignage().subscribe((response: any) => {
      //  this.loadingData = false;
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
      this.lastTwoTemoignage = lastTemoignage.slice(0, 2);
      //console.log("Liste des 4 temoignages", this. lastTwoTemoignage)
    });
  }

  // dataRealisationData: any;
  // lastTwoTemoignage: any[] = [];
  // loadingData: boolean = true;

  // Pour le viewer PDF
  selectedPdfTitle: string = '';
  currentPdfUrl: string = '';
  safePdfUrl: SafeResourceUrl | null = null;
  showPdfModal: boolean = false;
  showPdfPreview: boolean = false;

  // UUID de la réalisation
  realisationUuid: string = '';

  // constructor(
  //   public sanitizer: DomSanitizer,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   // Récupérer l'UUID depuis la route
  //   this.route.params.subscribe((params) => {
  //     this.realisationUuid = params['uuid'];
  //     this.loadRealisationDetail();
  //   });
  // }

  /**
   * Charge les détails de la réalisation
   */
  loadRealisationDetail(): void {
    this.loadingData = true;
    // Votre service pour charger les données
    // this.realisationService.getRealisationByUuid(this.realisationUuid)
    //   .subscribe({
    //     next: (response) => {
    //       this.dataRealisationData = response.data;
    //       this.loadingData = false;
    //     },
    //     error: (error) => {
    //       console.error('Erreur de chargement:', error);
    //       this.loadingData = false;
    //     }
    //   });
  }

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
    if (!realisa) return;

    this.selectedPdfTitle = realisa.titre;
    this.currentPdfUrl = this.getRealisationImage(realisa);
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.currentPdfUrl
    );
    this.showPdfModal = true;

    // Ouvrir le modal Bootstrap
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
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Télécharge le PDF
   */
  downloadPdf(realisa: any): void {
    const url = this.getRealisationImage(realisa);
    const fileName = `${realisa.titre.replace(/[^a-z0-9]/gi, '_')}.pdf`;

    // Méthode 1: Utiliser fetch et blob (recommandé)
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error('Erreur de téléchargement:', error);
        // Fallback: ouvrir dans un nouvel onglet
        window.open(url, '_blank');
      });
  }

  /**
   * Toggle la prévisualisation PDF
   */
  togglePdfPreview(): void {
    this.showPdfPreview = !this.showPdfPreview;
  }

  /**
   * Ouvre la modal de zoom pour les images
   */
  openImageModal(): void {
    if (this.isPdf(this.dataRealisationData)) return;

    const modalElement = document.getElementById('imageZoomModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  /**
   * Gère les erreurs de chargement d'image
   */
  onImageError(event: any): void {
    console.error("Erreur de chargement de l'image");
    event.target.src = 'assets/images/placeholder.jpg';
    event.target.alt = 'Image non disponible';
  }

  /**
   * Navigation vers LinkedIn
   */
  // navigateToLinkeDin(): void {
  //   const linkedinUrl = 'https://www.linkedin.com/company/votre-entreprise';
  //   window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  // }

  /**
   * Partage sur les réseaux sociaux (optionnel)
   */
  shareOnSocialMedia(platform: 'facebook' | 'twitter' | 'linkedin'): void {
    const url = window.location.href;
    const title =
      this.dataRealisationData?.titre || 'Découvrez notre réalisation';

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
    }

    if (shareUrl) {
      window.open(
        shareUrl,
        '_blank',
        'width=600,height=400,noopener,noreferrer'
      );
    }
  }

  /**
   * Copie le lien dans le presse-papier
   */
  copyLinkToClipboard(): void {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          // Afficher un message de succès (toast, snackbar, etc.)
          console.log('Lien copié dans le presse-papier');
          // Vous pouvez ajouter une notification utilisateur ici
        })
        .catch((err) => {
          console.error('Erreur lors de la copie:', err);
        });
    } else {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        console.log('Lien copié dans le presse-papier');
      } catch (err) {
        console.error('Erreur lors de la copie:', err);
      }
      document.body.removeChild(textArea);
    }
  }

  /**
   * Retour à la page précédente
   */
  goBack(): void {
    this.router.navigate(['/realisation-user']);
  }

  /**
   * Nettoyage lors de la destruction du composant
   */
  ngOnDestroy(): void {
    // Fermer la modal si elle est ouverte
    if (this.showPdfModal) {
      this.closePdfViewer();
    }
  }
}
