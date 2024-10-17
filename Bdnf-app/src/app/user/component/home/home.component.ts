import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ArticleService } from '../../../services/article-service/article.service';
import { RouterLink ,Router} from '@angular/router';
import { ServiceService } from '../../../services/services-service/service.service';
import { RealisationService } from '../../../services/realisation-service/realisation.service';
import { DateFormatPipe } from "../../../pipes/date-format.pipe";
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, DateFormatPipe, SpinnerComponent, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private articleService: ArticleService, private router : Router, private serviceService : ServiceService,
    private realisationSerice: RealisationService
  ){}
  ngOnInit(): void {
    this.allService();
    this.allArticle();
    this.allRealisation();
  }
  loadingData : boolean = false;

  servicaData: any[]=[];
  lastFourService: any[] = [];


  navigateToLinkeDin(): void {
    window.open('https://www.linkedin.com/in/ndeye-diama-niang?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
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
