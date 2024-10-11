import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { ArticleService } from '../../services/article-service/article.service';
import { CommentaireService } from '../../services/comment-service/commentaire.service';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { ParagraphPipe } from "../../pipes/paragraph.pipe";
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-blog',
  standalone: true,
  imports: [SidebarComponent, DateFormatPipe, ParagraphPipe, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './detail-blog.component.html',
  styleUrl: './detail-blog.component.css'
})
export class DetailBlogComponent implements OnInit {
detailCommentaire: any;
  constructor(
    private articleService: ArticleService, private commentaireService: CommentaireService,
    private activeRoute: ActivatedRoute, private notificationService: NotificationService,
    private toastrService: ToastrService
  ){}

  articleForm!: FormGroup;
  ngOnInit(): void {
    this.getOnlyArticle();
    this.getOnlycommentaire()
  }

  articleSupprimeMessage: string | null = null;

  onlyArticleData: any;
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
comentSelected: any;
detailComment(comment: any): void {
this.comentSelected = comment;
}

supprimerComment(id: any) {
  console.log('Demande de confirmation pour supprimer le service');
  Swal.fire({
    title: "Voulez-vous vraiment supprimer ce commentaire?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#388E3C",
    cancelButtonColor: "#A12825",
    width: 450,
    confirmButtonText: "Oui, Supprimer!",
    padding: 10,
    color: '#ffff',
    background: '#E7DCD6'
  }).then((result) => {
    console.log('Résultat de l\'alerte:', result);
    if (result.isConfirmed) {
      console.log('Suppression confirmée');
      this.commentaireService.deleteCommentaire(id).subscribe((response: any) => {
        console.log('Réponse de la suppression:', response);
        this.toastrService.success('Commentaire Supprimé avec succès');
        this.getOnlycommentaire();
      },
      (error) => {
        console.error('Erreur lors de la suppression de cette realisation', error);
        this.toastrService.error('Erreur lors de la suppression de ce commentaire');
      });
    } else {
      console.log('Suppression annulée');
      this.toastrService.warning('Suppression annulée');
    }
  }).catch((error) => {
    console.error('Erreur lors de l\'affichage de l\'alerte', error);
  });
}


supprimerArticle(id: any) {
  console.log('Demande de confirmation pour supprimer le service');
  Swal.fire({
    title: "Voulez-vous vraiment supprimer cette realistation?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#388E3C",
    cancelButtonColor: "#A12825",
    width: 450,
    confirmButtonText: "Oui, Supprimer!",
    padding: 10,
    color: '#ffff',
    background: '#E7DCD6'
  }).then((result) => {
    console.log('Résultat de l\'alerte:', result);
    if (result.isConfirmed) {
      console.log('Suppression confirmée');
      this.articleService.delateArice(id).subscribe((response: any) => {
        console.log('Réponse de la suppression:', response);
        this.toastrService.success('Realisation Supprimé avec succès');
        this.onlyArticleData = null;
        this.articleSupprimeMessage = "L'article a été supprimé avec succès.";
      },
      (error) => {
        console.error('Erreur lors de la suppression de cette realisation', error);
        this.toastrService.error('Erreur lors de la suppression de cette realisation');
      });
    } else {
      console.log('Suppression annulée');
      this.toastrService.warning('Suppression annulée');
    }
  }).catch((error) => {
    console.error('Erreur lors de l\'affichage de l\'alerte', error);
  });
}

}
