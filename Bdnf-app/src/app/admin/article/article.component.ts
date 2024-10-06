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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [HttpClientModule, FormsModule, SidebarComponent, ReactiveFormsModule,NgIf, NgFor, RouterLink],
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
articleForm!: FormGroup
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
  }



  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Fichier sélectionné :', this.selectedFile);
  }


allCtagoreie(): void{
  this.categorieService.getCategorie().subscribe((data: any)=>{
this.dataCategorie = data.data
console.log('voir datacategorie✅✅', data)
console.log('voir datacategorie✅✅', this.dataCategorie)
  })
}


ajouterCategorie(){
  const newCatego = {
    nomCategorie: this.nomCategorie
  }
  try {
    this.categorieService.addCategorie(newCatego).subscribe((response : any) =>{
      console.log('Service ajouté avec succès', response);
      this.allCtagoreie;
      this.nomCategorie = '';
      console.log('voir ajout',newCatego )

      // this.showAllService();
    })
  } catch (error) {
    console.error('Erreur lors de l\'ajout du service:', error);
  }
}

ajouterArticle(): void {
  // Utilisation de FormData pour envoyer des données, y compris un fichier
  const newAricle ={
    titre: this.articleForm.value.titre,
    contenue: this.articleForm.value.contenue,
    categorie_id: this.articleForm.value.categorie_id,
  }
  console.log('valeur categorie_id', this.articleForm.value.categorie_id);

  // Envoyer le FormData via le service HTTP
  this.articleService.addArticle(newAricle).subscribe(
    (response) => {
      this.articleForm.reset();
      this.allArticle();
      console.log("Réponse du serveur: ✅✅✅✅✅✅", response);
      if(response.status !== 200){
        throw new Error('article mal ajouté')
      }
      if(this.selectedFile){
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        this.articleService.addArticleImag(response.data.uuid, formData).subscribe((response: any)=>{
          console.log('ajout image response', response);
          this.allArticle();
        })
      }
    },
    (error) => {
      console.error("Erreur lors de l'ajout de la réalisation", error);
    }
  );
}
dataArticle: any[]=[];
allArticle(): void {
  try {
    this.articleService.allArticle().subscribe((response) => {
      this.dataArticle = response.data.map((article: any) => {
        article.image = `https://api.bdnf-marketing-solutions.com${article.image}`;
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
        this.allArticle();
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


// pagination and search

   // Attribut pour la pagination
   articlesParPage = 4; // Nombre d'articles par page
   pageActuelle = 1; // Page actuelle

dataArticletrouve : any []=[];
searchArticle : string= '';
getArticlesPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
  const indexFin = indexDebut + this.articlesParPage;
  this.dataArticletrouve= this.dataArticle.filter((service: { titre: string; contenue: string; }) =>
    service.titre.toLowerCase().includes(this.searchArticle.toLowerCase()) ||
    service.contenue.toLowerCase().includes(this.searchArticle.toLowerCase())
    );
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
