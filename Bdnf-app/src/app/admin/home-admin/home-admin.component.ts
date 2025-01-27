import { Component } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { ArticleService } from '../../services/article-service/article.service';
import { RealisationService } from '../../services/realisation-service/realisation.service';
import { ServiceService } from '../../services/services-service/service.service';
import { NewsletterService } from '../../services/news-service/newsletter.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  constructor(
    private articleServicxe: ArticleService, private realisationService: RealisationService, private serviceService: ServiceService, private newsletterService : NewsletterService
  ) { }
  ngOnInit() {
    this.allArticle();
    this.allrealosation();
    this.allServiice();
    this.allNewsletter();
  }
  dataService: any[] = []
  allServiice(): void {
    this.serviceService.allService().subscribe((response) => {
      console.log("All services", response.data);
      this.dataService = response.data;
    })
  }
  dataRealisation: any[] = []
  allrealosation(): void {
    this.realisationService.gatAllRealisation().subscribe((response) => {
      console.log("All realisation", response.data);
      this.dataRealisation = response.data;
    })
  }
  dataArticles: any[] = []
  allArticle(): void {
    this.articleServicxe.allArticle().subscribe((response) => {
      console.log("All article", response.data);
      this.dataArticles = response.data;
    })
  }
  dataNewsletter: any[] = []
  allNewsletter(): void {
    this.newsletterService.getAllNewsLetter().subscribe((response) => {
      console.log("All newsletter", response.data);
      this.dataNewsletter = response.data;
    })
  }

}
