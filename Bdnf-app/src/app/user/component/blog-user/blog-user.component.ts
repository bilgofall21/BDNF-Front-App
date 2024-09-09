import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../../services/article-service/article.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, FormsModule, NgFor],
  templateUrl: './blog-user.component.html',
  styleUrl: './blog-user.component.css'
})
export class BlogUserComponent implements OnInit {
  constructor(private articleService: ArticleService){}
  ngOnInit(): void {
    this.allArticle();
  }


  allArticleData: any[] = [];

  allArticle(): void{
    this.articleService.allArticle().subscribe((data)=> {
      this.allArticleData = data.data
      console.log("✅✅✅",this.allArticleData)

    })
    }

    articlesParPage = 4; // Nombre d'articles par page
    pageActuelle = 1; // Page actuelle

    allArticleDatatrouve : any []=[];
    searchArticle : string= '';
    getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    this.allArticleDatatrouve= this.allArticleData.filter((service: { titre: string; contenue: string; }) =>
     service.titre.toLowerCase().includes(this.searchArticle.toLowerCase()) ||
     service.contenue.toLowerCase().includes(this.searchArticle.toLowerCase())
     );
    return this.allArticleDatatrouve.slice(indexDebut, indexFin);
    }
    // Méthode pour générer la liste des pages
    get pages(): number[] {
     const totalPages = Math.ceil(this. allArticleData.length / this.articlesParPage);
     return Array(totalPages).fill(0).map((_, index) => index + 1);
    }

    // Méthode pour obtenir le nombre total de pages
    get totalPages(): number {
     return Math.ceil(this. allArticleData.length / this.articlesParPage);
    }

}
