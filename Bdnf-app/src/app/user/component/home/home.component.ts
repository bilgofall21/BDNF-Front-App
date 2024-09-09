import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ArticleService } from '../../../services/article-service/article.service';
import { RouterLink ,Router} from '@angular/router';
import { ServiceService } from '../../../services/services-service/service.service';
import { RealisationService } from '../../../services/realisation-service/realisation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink],
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

  servicaData: any[]=[];
  lastFourService: any[] = [];
  allService(): void {
    this.serviceService.allService().subscribe((data: any)=> {
      this.servicaData = data.data;
      console.log("✅✅Service",this.servicaData)
      const lastService = this.servicaData.sort((a: {created_at: string | number | Date}, b: {created_at: string | number | Date}) =>{
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      this.lastFourService = lastService.slice(0, 4)
      console.log("😁😁😁",this.lastFourService)
    })
  }
  dataRealisation: any[] = [];
  lastFourRealisation: any[] = [];
  allRealisation(): void {
    this.realisationSerice.gatAllRealisation().subscribe((data: any)=>{
      this.dataRealisation = data.data;
      const lastRealisation = this.dataRealisation.sort((a: {created_at: string | number | Date}, b:{created_at: string | number | Date}) =>{
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      this.lastFourRealisation = lastRealisation.slice(0, 4);

    })
  }



  allArticleData: any[] = [];
  lastFourArticel: any[] = [];
  allArticle(): void{
  this.articleService.allArticle().subscribe((data)=> {
    this.allArticleData = data.data
    const lastArticle = this.allArticleData.sort((a: {created_at: string | number | Date}, b: {created_at: string | number | Date})=>{
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    this.lastFourArticel = lastArticle.slice(0, 4)
    console.log('step article', this.lastFourArticel)
  })
  }
  letsFo(id: any, event: Event): void {
    event.preventDefault();
    this.router.navigate(['/blog', id]);
    console.log("✅✅✅")
  }

}
