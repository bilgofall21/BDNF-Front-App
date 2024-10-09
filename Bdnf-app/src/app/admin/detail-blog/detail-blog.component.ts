import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { ArticleService } from '../../services/article-service/article.service';
import { CommentaireService } from '../../services/comment-service/commentaire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-blog',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './detail-blog.component.html',
  styleUrl: './detail-blog.component.css'
})
export class DetailBlogComponent implements OnInit {
  constructor(
    private articleService: ArticleService, private commentaireService: CommentaireService,
    private activeRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.getOnlyArticle();
    this.getOnlycommentaire()
  }

  onlyArticleData: [] = [];
  getOnlyArticle(): void{
    const uuidArtice = this.activeRoute.snapshot.params['uuid'];
    this.articleService.getArticleById(uuidArtice).subscribe((response: any) =>{
      this.onlyArticleData = response.data;
      console.log('voir my articl ✅✅', this.onlyArticleData)

    })
  }
onlyCommentaireData: any[]= [];
  getOnlycommentaire(): void{
    const uuidArtice = this.activeRoute.snapshot.params['uuid'];
    this.commentaireService.getCommentaire(uuidArtice).subscribe((response: any) =>{
      this.onlyCommentaireData = response.data;
      console.log('voir mes commentaires����', this.onlyCommentaireData)
  })

}

}
