import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../../services/article-service/article.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DateFormatPipe } from "../../../pipes/date-format.pipe";
import { SpinnerComponent } from '../../../anmation/spinner/spinner.component';
import { ParagraphPipe } from '../../../pipes/paragraph.pipe';

@Component({
  selector: 'app-blog-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, FormsModule, NgFor, DateFormatPipe, SpinnerComponent, ParagraphPipe],
  templateUrl: './blog-user.component.html',
  styleUrl: './blog-user.component.css'
})
export class BlogUserComponent implements OnInit {
  constructor(private articleService: ArticleService, private router: Router){}
  ngOnInit(): void {
     this.router.events.subscribe(event => {
              if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
              }
              // window.scrollTo(0, 0);
            });
    this.allArticle();
  }


  allArticleData: any[] = [];
  loadingData : boolean =  false;

  allArticle(): void{
    this.loadingData = true;
    this.articleService.allArticle().subscribe((data)=> {
      this.loadingData = false;
      this.allArticleData = data.data
      //console.log("✅✅✅",this.allArticleData)

    })
    }

    articlesParPage = 6; // Nombre d'articles par page
    pageActuelle = 1; // Page actuelle

    allArticleDatatrouve : any []=[];
    searchArticle : string= '';
    noResultatFound :  string= '';

    getArticleImage(article: any) {
      if (!article || !article.image) {
        console.error('Article image is undefined');
        return '';
      }
      // Utilisez une expression régulière pour extraire le chemin relatif correct
      const relativePath = article.image.replace(/^.*public\//, '');
      return `https://bdnf-api.terangacode.com/public/${relativePath}`;
    }
    getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    this.allArticleDatatrouve= this.allArticleData.filter((service: { titre: string; contenue: string; }) =>
     service.titre.toLowerCase().includes(this.searchArticle.toLowerCase()) ||
     service.contenue.toLowerCase().includes(this.searchArticle.toLowerCase())
     );
     if(this.searchArticle && this.allArticleDatatrouve.length === 0){
       this.noResultatFound = 'Désolé aucun résultat trouvé pour votre recherche'
     }else{
       this.noResultatFound = '';
     }
    return this.allArticleDatatrouve.slice(indexDebut, indexFin);
    }
    // Méthode pour générer la liste des pages
    get pages(): number[] {
    //  const totalPages = Math.ceil(this. allArticleData.length / this.articlesParPage);
    //   return Array(totalPages).fill(0).map((_, index) => index + 1);
          // Ensure serviceData is an array (default to an empty array if undefined)
    const totalPages = this.allArticleData ? Math.ceil(this.allArticleData.length / this.articlesParPage) : 0;

    // Return an array of page numbers if totalPages is greater than 0
    return totalPages > 0 ? Array(totalPages).fill(0).map((_, index) => index + 1) : [];
    }

    // Méthode pour obtenir le nombre total de pages
    get totalPages(): number {
     return Math.ceil(this. allArticleData.length / this.articlesParPage);
    }

}
