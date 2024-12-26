import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieService } from '../../services/catego-service/categorie.service';
import { ArticleService } from '../../services/article-service/article.service';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { NgFor, NgIf } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RouterLink, RouterModule } from '@angular/router';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { ParagraphPipe } from "../../pipes/paragraph.pipe";
import { SpinnerComponent } from "../../anmation/spinner/spinner.component";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [HttpClientModule, FormsModule, SidebarComponent, ReactiveFormsModule, NgIf, NgFor, RouterLink, DateFormatPipe, ParagraphPipe, RouterModule, SpinnerComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  dataCategorie: any[]= [];
nomCategorie : string ="";
public image: any;
categorie_id: any;
titre: string = "";
contenue: string = "";
articleForm!: FormGroup;
loadingPage = true;
loadingData : boolean = false;
// categorie_id: any;
constructor(
  private categorieService: CategorieService, private articleService : ArticleService, private notificationService: NotificationService,
  private toastrService: ToastrService
){}
  ngOnInit(): void {
    this.articleForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      contenue: new FormControl('', [Validators.required]),
      categorie_id: new FormControl('', [Validators.required]),
    })
   this.allCtagoreie(); this.allArticle();
   this.loadingPage = false;
  }

  checkLoadingStatus(): void {
    if (this.dataCategorie.length > 0 && this.dataArticle.length > 0) {
      this.loadingData = false; // Masquer le spinner lorsque les deux chargements sont terminés
    }
  }



  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Fichier sélectionné :', this.selectedFile);
  }


allCtagoreie(): void{
  this.loadingData = true; // Afficher le spinner lors du chargement des données
  this.categorieService.getCategorie().subscribe((data: any)=>{
this.dataCategorie = data.data
// this.checkLoadingStatus();
this.loadingData = false;
console.log('voir datacategorie✅✅', data)
console.log('voir datacategorie✅✅', this.dataCategorie)
  })
}

categoElement : any;
showCatego(catego : any) : void {
  this.categoElement = catego;
}


ajouterCategorie(){
  const newCatego = {
    nomCategorie: this.nomCategorie
  }
  try {
    this.categorieService.addCategorie(newCatego).subscribe((response : any) =>{
      console.log('Service ajouté avec succès', response);
      this.allCtagoreie();
      this.nomCategorie = '';
      console.log('voir ajout',newCatego )

      // this.showAllService();
    })
  } catch (error) {
    console.error('Erreur lors de l\'ajout du service:', error);
  }
}

ajouterArticle(): void {
  const newArticle = {
    titre: this.articleForm.value.titre,
    contenue: this.articleForm.value.contenue,
    categorie_id: this.articleForm.value.categorie_id
  };

  console.log('valeur categorie_id', this.articleForm.value.categorie_id);
try {
  // Affichage de la confirmation via le service de notification
  this.notificationService.confirmAlert(
    'Voulez-vous vraiment ajouter cet article ?'
  ).then(confirmed => {
    if (confirmed) {
      // Envoyer les données de l'article via le service HTTP
      this.articleService.addArticle(newArticle).subscribe(
        (response) => {
          console.log("Réponse du serveur: ✅✅✅✅✅✅", response);

          // Si la réponse n'est pas de succès, lever une erreur
          if (response.status !== 200) {
            throw new Error('article mal ajouté');
          }

          // Réinitialisation du formulaire et mise à jour de la liste des articles
          this.articleForm.reset();
          this.allArticle();
          this.toastrService.success('Article ajouté avec succès');

          // Ajout de l'image si un fichier est sélectionné
          if (this.selectedFile) {
            const formData = new FormData();
            formData.append('image', this.selectedFile);
            this.articleService.addArticleImag(response.data.uuid, formData).subscribe(
              (response: any) => {
                console.log('ajout image response 💕💕💕💕', response);
                this.allArticle(); // Mise à jour après ajout de l'image
              },
              (error) => {
                console.error("Erreur lors de l'ajout de l'image", error);
                this.toastrService.error('Erreur lors de l\'ajout de l\'image');
              }
            );
          }
        },
        (error) => {
          console.error("Erreur lors de l'ajout de l'article", error);
          this.toastrService.error('Erreur lors de l\'ajout de l\'article');
        }
      );
    } else {
      this.toastrService.warning('Ajout d\'article annulé');
    }
  });

} catch (error) {
this.toastrService.error(`{error}`);
}
}






dataArticle: any[]=[];
allArticle(): void {
  this.loadingData = true;
  try {
    this.articleService.allArticle().subscribe((response) => {
      this.dataArticle = response.data.map((article: any) => {
        // article.image = `https://api.bdnf-marketing-solutions.com${article.image}`;
        article.image = `https://127.0.0.1:8000${article.image}`;
        // this.checkLoadingStatus();
        this.loadingData = false;
        return article;
      });
      console.log('voir tous les articles', this.dataArticle);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles', error);
  }
  }
elementSelectionner : any;

loadRealisation(realisation: any){
  this.articleForm.patchValue({
    titre: realisation.titre,
    contenue: realisation.contenue,
    categorie_id: realisation.categorie_id,
    uuid: realisation.uuid
  });
  this.elementSelectionner = realisation.uuid
    }

modifierAricle(){

      let formData= new FormData();
      formData.append('titre', this.articleForm.value.titre);
      formData.append('contenue', this.articleForm.value.contenue );
      formData.append('categorie_id', this.articleForm.value.categorie_id);
      if(this.selectedFile){
        formData.append('image', this.selectedFile);
      }
      this.notificationService.confirmAlert('voulez-vous vraiment modifier ce realisation'
      ).then(confirmed =>{
        if(confirmed){
          this.articleService.updateArticle(formData, this.elementSelectionner).subscribe((response : any) =>{
            console.log('step uuid', this.elementSelectionner)
            console.log('stepp1', response)
            this.toastrService.success('Realisation modifié avec succès')
            this.allArticle();
            this.articleForm.reset();
          },
          (error) =>{
            console.error('Erreur lors de la modification de cette realisation',error)
            this.toastrService.error('Erreur lors de la modification de cette realisation')
          });
        }else{
          this.toastrService.warning('modification annulée')
        }
      })

}
categoSelectionner: any
loadCategorie(categorie: any){
  this.categoSelectionner = categorie.uuid;
  this.nomCategorie = categorie.nomCategorie;
    }
modifierCatego(){

      const updateCategorie = {
        nomCategorie: this.nomCategorie
      }
      console.log('fffffffffffff😒😒😒😒', updateCategorie)
      console.log('step uuid 😒😒😒😒😒 ', this.categoSelectionner)
      this.notificationService.confirmAlert('voulez-vous vraiment modifier cette categorie'
      ).then(confirmed =>{
        if(confirmed){
          this.categorieService.updateCategorie(updateCategorie, this.categoSelectionner).subscribe((response : any) =>{

            console.log('stepp1 😂😂😂😂', response)
            this.toastrService.success('Categorie modifié avec succès')
          this.allCtagoreie();
            this.nomCategorie = '';
          },
          (error) =>{
            console.log('❌❌❌❌❌❌')

            console.error('Erreur lors de la modification de cette Categorie',error)
            this.toastrService.error('Erreur lors de la modification de cette categorie')
          });
        }else{
          this.toastrService.warning('modification annulée')
        }
      })

}

modifierService(){
  const updateCategorie = {
    nomCategorie: this.nomCategorie
  }
      this.notificationService.confirmAlert('voulez-vous vraiment modifier ce service'
      ).then(confirmed =>{
        if(confirmed){
          this.categorieService.updateCategorie(updateCategorie, this.categoSelectionner).subscribe((response : any) =>{
            this.toastrService.success('Service modifié avec succès')
            this.allCtagoreie();
            this.nomCategorie ='';
          },
          (error) =>{
            console.error('Erreur lors de la modification du service',error)
            this.toastrService.error('Erreur lors de la modification du service')
          });
        }else{
          this.toastrService.warning('modification annulée')
        }
      })

}

annuler(): void {
  this.articleForm.reset();
  this.selectedFile = null;
  this.image = false;
  this.nomCategorie = '';
}


supprimerCategorie(id: any) {
  console.log('Demande de confirmation pour supprimer le service');
  Swal.fire({
    title: "Voulez-vous vraiment supprimer cette catégirie?",
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
      this.categorieService.deleteCategorie(id).subscribe((response: any) => {
        console.log('Réponse de la suppression:', response);
        this.toastrService.success('Catégorie Supprimé avec succès');
        this.allCtagoreie();
      },
      (error) => {
        console.error('Erreur lors de la suppression de cette realisation', error);
        this.toastrService.error('Erreur lors de la suppression de cette rcatégorie');
      });
    } else {
      console.log('Suppression annulée');
      this.toastrService.warning('Suppression annulée');
    }
  }).catch((error) => {
    console.error('Erreur lors de l\'affichage de l\'alerte', error);
  });
}


// pagination and search

   // Attribut pour la pagination
   articlesParPage = 4; // Nombre d'articles par page
   pageActuelle = 1; // Page actuelle

dataArticletrouve : any []=[];
searchArticle : string= '';
nosearchResult : string= '';
getArticlesPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
  const indexFin = indexDebut + this.articlesParPage;
  this.dataArticletrouve= this.dataArticle.filter((service: { titre: string; contenue: string; }) =>
    service.titre.toLowerCase().includes(this.searchArticle.toLowerCase()) ||
    service.contenue.toLowerCase().includes(this.searchArticle.toLowerCase())
    );
    if(this.searchArticle && this.dataArticletrouve.length === 0){
      this.nosearchResult = 'Désolé aucun résultat pour votre recherche';
    }else{
      this.nosearchResult = '';
    }
  return this.dataArticletrouve.slice(indexDebut, indexFin);
}
   // Méthode pour générer la liste des pages
   get pages(): number[] {
    const totalPages = Math.ceil(this. dataArticle.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this. dataArticle.length / this.articlesParPage);
  }
}
