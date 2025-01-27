import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ArticleService } from '../../../services/article-service/article.service';
import { RouterLink ,Router} from '@angular/router';
import { ServiceService } from '../../../services/services-service/service.service';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { DateFormatPipe } from "../../../pipes/date-format.pipe";
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';
import { NgStyle } from '@angular/common';
import { NewsletterService } from '../../../services/news-service/newsletter.service';
import { ToastComponent } from '../../../anmation/toast/toast.component';
import { FormsModule } from '@angular/forms';
import { TemoignageService } from '../../../services/temoigna-service/temoignage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, DateFormatPipe, SpinnerComponent, NgStyle, ToastComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private articleService: ArticleService, private router : Router, private serviceService : ServiceService,
    private realisationSerice: RealisationService, private newsletterService: NewsletterService, private temoignageService: TemoignageService
  ){}
  ngOnInit(): void {
    this.allService();
    this.allArticle();
    this.allRealisation();
    this.allTemoignage();
  }
  @ViewChild('ToastComponent') toast?: ToastComponent;

  loadingData : boolean = false;
  email = '';
  servicaData: any[]=[];

  lastFourService: any[] = [];


  navigateToLinkeDin(): void {
    window.open('https://www.linkedin.com/in/ndeye-diama-niang?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
  }

  addNewsletter(): void{
    const myEmail = {
      email: this.email
    }
    this.newsletterService.addNewsletter(myEmail).subscribe((response: any)=>{
      console.log("voir le nws", response);
      this.toast?.showToast('Inscription aux newsletter réussi')

      this.email = '';
    })
  }
   temoignageData: any[]=[];
   lastFourTemoignage: any[] = [];
  allTemoignage(): void {
    this.loadingData = true;
    this.temoignageService.allTemoignage().subscribe((response: any) => {
      this.loadingData = false;
      this.temoignageData = response.data;
      console.log("All temoignage", this.temoignageData);
      const lastTemoignage = this.temoignageData.sort((a: {created_at: string | number | Date}, b: {created_at: string | number | Date}) =>{
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      this. lastFourTemoignage = lastTemoignage.slice(0, 4);
      console.log("Liste des 4 temoignages", this. lastFourTemoignage)

    })
  }
  allService(): void {
    this.loadingData = true;
    this.serviceService.allService().subscribe((data: any)=> {
      this.loadingData = false;
      this.servicaData = data.data;
      console.log("✅✅Service",this.servicaData)
      const lastService = this.servicaData.sort((a: {created_at: string | number | Date}, b: {created_at: string | number | Date}) =>{
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      this.lastFourService = lastService.slice(0, 3)
      console.log("😁😁😁",this.lastFourService)
    })
  }
  dataRealisation: any[] = [];
  lastFourRealisation: any[] = [];
  allRealisation(): void {
    this.loadingData = true;
    this.realisationSerice.gatAllRealisation().subscribe((data: any)=>{
      this.loadingData = false;
      this.dataRealisation = data.data;
      const lastRealisation = this.dataRealisation.sort((a: {created_at: string | number | Date}, b:{created_at: string | number | Date}) =>{
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      this.lastFourRealisation = lastRealisation.slice(0, 4);

    })
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
  //   console.log('step article 🤣🤣', this.lastFourArticel)
  // })
  // }
  allArticle(): void {
    this.loadingData = true;
    this.articleService.allArticle().subscribe((data) => {
      this.allArticleData = data.data.map((article: any) => {
        // article.image = `https://api.bdnf-marketing-solutions.com/public${article.image}`;
        return article;
      });
      const lastArticle = this.allArticleData.sort((a: { created_at: string | number | Date }, b: { created_at: string | number | Date }) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      this.lastFourArticel = lastArticle.slice(0, 3);
      this.loadingData = false;
      console.log('step article 🤣🤣', this.lastFourArticel);
    });
  }

  letsFo(id: any, event: Event): void {
    event.preventDefault();
    this.router.navigate(['/blog', id]);
    console.log("✅✅✅")
  }

}
