import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ArticleService } from '../../../services/article-service/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentaireService } from '../../../services/comment-service/commentaire.service';
import { FormsModule } from '@angular/forms';
import { close } from 'fs';
import { CommonModule, NgIf } from '@angular/common';
import { DateFormatPipe } from "../../../pipes/date-format.pipe";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgIf, CommonModule, DateFormatPipe, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  constructor(
    private articleService: ArticleService, private activeRoute : ActivatedRoute, private commentService  : CommentaireService,
  ){}

  pseudo : string = '';
  contenue: string = '';
  ngOnInit(): void {
    this.allArticle();
    this.articleById();
    this.showComment();

  }

  allArticleData: any[] = [];
  lastTreArticle: any[] = [];
allArticle(): void{
this.articleService.allArticle().subscribe((data)=> {
  this.allArticleData = data.data;
  const lastArticle = this.allArticleData.sort((a: {created_at: string | number | Date}, b: {created_at: string | number | Date})=>{
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  })
  this.lastTreArticle = lastArticle.slice(0, 3)

})
}
articleByIdData: any=[];
commentId = '';
article_id : any = '';
ariticle_uuid : any = '';

articleById(): void{
  this.ariticle_uuid = this.activeRoute.snapshot.params['uuid']
  this.articleService.getArticleById(this.ariticle_uuid).subscribe((data:any) =>{
    this.articleByIdData = data.data
    this.showComment();
    const IdComment = this.articleByIdData.id
    // this.ariticle_uuid = this.articleByIdData.uuid
    console.log('voir uuid article', this.ariticle_uuid)
    this.commentId = IdComment

    console.log('✅✅dddd✅',this.articleByIdData)
  })
}


addComment(): void {

  const newComment = {
    pseudo: this.pseudo,
    contenue : this.contenue,
    article_id: this.commentId

  }
  console.log('👌👌👌👌', this.ariticle_uuid)

  this.commentService.addComment(newComment).subscribe((response: any) =>{
    // console.log('voir id', newComment.article_id)
    // console.log("step 1",response)
    this.showComment();
    this.pseudo = '';
    this.contenue = '';
  })
}
dataCommnent: any[]=[];
newDataComment: any[] = [];
currentDisplayCount: number = 3;
showComment(): void{
 const iddd = this.ariticle_uuid;
 console.log('ffffff', iddd)
 this.commentService.getCommentaire(this.ariticle_uuid).subscribe((data)=>{
   this.dataCommnent = data.data
   console.log('🤴🤴🤴 step1', this.dataCommnent)
    this.dataCommnent.sort((a: {created_at: string| number| Date}, b: {created_at: string| number| Date}) =>{
      console.log('step3', this.dataCommnent)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    this.newDataComment = this.dataCommnent.slice(0, this.currentDisplayCount)
    console.log('step3', this.newDataComment)

  })
}

loadMoreComments(): void {
  this.currentDisplayCount += 5; // Augmenter le nombre de commentaires à afficher
  this.newDataComment = this.dataCommnent.slice(0, this.currentDisplayCount); // Mettre à jour la liste affichée
}

loadLessComments(): void {
  this.currentDisplayCount = 3; // Diminuer le nombre de commentaires à afficher
  this.newDataComment = this.dataCommnent.slice(0, this.currentDisplayCount); // Mettre à jour la liste affichée
}

}
