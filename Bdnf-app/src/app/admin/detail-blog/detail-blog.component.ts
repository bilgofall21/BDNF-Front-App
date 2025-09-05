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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieService } from '../../services/catego-service/categorie.service';

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
    private categorieService: CategorieService,
    private articleService: ArticleService, private commentaireService: CommentaireService,
    private activeRoute: ActivatedRoute, private notificationService: NotificationService,
    private toastrService: ToastrService
  ){}
  public image: any;
categorie_id: any;
titre: string = "";
contenue: string = "";
articleForm!: FormGroup;
  ngOnInit(): void {
    this.articleForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      contenue: new FormControl('', [Validators.required]),
      categorie_id: new FormControl('', [Validators.required]),
    });
    this.getOnlyArticle();
    this.getOnlycommentaire()
    this.allCtagoreie();
  }

  articleSupprimeMessage: string | null = null;
  dataCategorie: any[]= [];

  allCtagoreie(): void{
    // this.loadingData = true; // Afficher le spinner lors du chargement des données
    this.categorieService.getCategorie().subscribe((data: any)=>{
  this.dataCategorie = data.data
  // this.checkLoadingStatus();
  // this.loadingData = false;
  // //console.log('voir datacategorie✅✅', data)
  // //console.log('voir datacategorie✅✅', this.dataCategorie)
    })
  }

  onlyArticleData: any;
  getOnlyArticle(): void{
    const uuidArtice = this.activeRoute.snapshot.params['uuid'];
    this.articleService.getArticleById(uuidArtice).subscribe((response: any) =>{
      this.onlyArticleData = response.data;
      // //console.log('voir my articl ✅✅', this.onlyArticleData)

    })
  }
onlyCommentaireData: any[]= [];
  getOnlycommentaire(): void{
    const uuidArtice = this.activeRoute.snapshot.params['uuid'];
    this.commentaireService.getCommentaire(uuidArtice).subscribe((response: any) =>{
      this.onlyCommentaireData = response.data;
      // //console.log('voir mes commentaires����', this.onlyCommentaireData)
  })
}
comentSelected: any;
detailComment(comment: any): void {
  //console.log('😒😒😒😒😒😒😒😒😒')
this.comentSelected = comment;
}

articleSelected: any;
  detailArticle(article: any): void {
    //console.log('������������������')
this.articleSelected = article;
}

supprimerComment(id: any) {
  //console.log('Demande de confirmation pour supprimer le service');
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
    //console.log('Résultat de l\'alerte:', result);
    if (result.isConfirmed) {
      //console.log('Suppression confirmée');
      this.commentaireService.deleteCommentaire(id).subscribe((response: any) => {
        //console.log('Réponse de la suppression:', response);
        this.toastrService.success('Commentaire Supprimé avec succès');
        this.getOnlycommentaire();
      },
      (error) => {
        console.error('Erreur lors de la suppression de cette article', error);
        this.toastrService.error('Erreur lors de la suppression de ce commentaire');
      });
    } else {
      //console.log('Suppression annulée');
      this.toastrService.warning('Suppression annulée');
    }
  }).catch((error) => {
    console.error('Erreur lors de l\'affichage de l\'alerte', error);
  });
}


supprimerArticle(id: any) {
  //console.log('Demande de confirmation pour supprimer le service');
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
    //console.log('Résultat de l\'alerte:', result);
    if (result.isConfirmed) {
      //console.log('Suppression confirmée');
      this.articleService.delateArice(id).subscribe((response: any) => {
        //console.log('Réponse de la suppression:', response);
        // this.toastrService.success('Article Supprimé avec succès');
        this.onlyArticleData = null;
        this.articleSupprimeMessage = "L'article a été supprimé avec succès.";
        this.getOnlycommentaire();
      },
      (error) => {
        console.error('Erreur lors de la suppression de cette article', error);
        this.toastrService.error('Erreur lors de la suppression de cette article');
      });
    } else {
      //console.log('Suppression annulée');
      this.toastrService.warning('Suppression annulée');
    }
  }).catch((error) => {
    console.error('Erreur lors de l\'affichage de l\'alerte', error);
  });
}

selectedFile: File | null = null;
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  //console.log('Fichier sélectionné :', this.selectedFile);
}

loadRealisation(realisation: any){
  this.articleForm.patchValue({
    titre: realisation.titre,
    contenue: realisation.contenue,
    categorie_id: realisation.categorie_id,
    uuid: realisation.uuid
  });
  this.elementSelectionner = realisation.uuid
    }
elementSelectionner : any;
modifierAricle(){

  let formData= new FormData();
  formData.append('titre', this.articleForm.value.titre);
  formData.append('contenue', this.articleForm.value.contenue );
  formData.append('categorie_id', this.articleForm.value.categorie_id);
  if(this.selectedFile){
    formData.append('image', this.selectedFile);
  }
  this.notificationService.confirmAlert('voulez-vous vraiment modifier cet article'
  ).then(confirmed =>{
    if(confirmed){
      this.articleService.updateArticle(formData, this.elementSelectionner).subscribe((response : any) =>{
        //console.log('step uuid', this.elementSelectionner)
        //console.log('stepp1', response)
        this.getOnlyArticle();
        this.toastrService.success('article modifié avec succès')
        // this.allArticle();
        this.articleForm.reset();
      },
      (error) =>{
        console.error('Erreur lors de la modification de cette article',error)
        this.toastrService.error('Erreur lors de la modification de cette article')
      });
    }else{
      this.toastrService.warning('modification annulée')
    }
  })

}



}
