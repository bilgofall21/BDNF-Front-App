import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../services/catego-service/categorie.service';
import { ArticleService } from '../../services/article-service/article.service';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [HttpClientModule, FormsModule, SidebarComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  dataCategorie: any[]= [];
public nomCategorie : string ="";
public image: any;
public categorie_id: any;
public titre: string = "";
public contenue: string = "";
// categorie_id: any;
constructor(
  private categorieService: CategorieService, private articleService : ArticleService
){}
  ngOnInit(): void {
   this.allCtagoreie();
  }


// getFile(event: any) {
//   console.warn(event.target.files[0]);
//   this.image= event.target.files[0] as File ;
// }
onFileSelected(event: any) {
  this.articleData.image = event.target.files[0];
}


allCtagoreie(): void{
  this.categorieService.getCategorie().subscribe((data: any)=>{
this.dataCategorie = data.data
console.log('voir data✅✅', this.dataCategorie)
  })
}


ajouterCategorie(){
  const newCatego = {
    nomCategorie: this.nomCategorie
  }
  try {
    this.categorieService.addCategorie(newCatego).subscribe((data : any) =>{
      console.log('Service ajouté avec succès', data);
      console.log('voir ajout',newCatego )
      // this.showAllService();
    })
  } catch (error) {
    console.error('Erreur lors de l\'ajout du service:', error);
  }
}

articleData = {
  titre: '',
  contenue: '',
  categorie_id: '',
  image:'',
}

// ajouterArticle(): void {

//   const newArticel = {
//   titre : this.titre,
//   contenue : this.contenue,
//   categorie_id : this.categorie_id,
//   image : this.image,
//   }
//   const formData = new FormData();
//   formData.append('titre', this.titre);
//   formData.append('contenue', this.contenue);
//   formData.append('categorie_id', this.categorie_id);
//   formData.append('image', this.image);  // Si vous avez un fichier image

//   console.log(formData.get('titre'));  // Pour vérifier les données
//   console.log(formData.get('contenue'));
//   console.log(formData.get('categorie_id'));
//   console.log(formData.get('image'));

//   // Debugging: afficher les données avant de les envoyer
//   console.log("FormData:", newArticel.titre, newArticel.contenue, newArticel.categorie_id, newArticel.image);

//   this.articleService.addArticle(newArticel).subscribe(
//     (response) => {
//       console.log("Réponse du serveur: ✅✅✅✅✅✅", response);
//     },
//     (error) => {
//       console.error("Erreur lors de l'ajout de la réalisation", error);
//     }
//   );
// }


ajouterArticle(): void {
  // Utilisation de FormData pour envoyer des données, y compris un fichier
  const formData = new FormData();
  formData.append('titre', this.articleData.titre);
  formData.append('contenue', this.articleData.contenue);
  formData.append('categorie_id', this.articleData.categorie_id);
  formData.append('image', this.articleData.image);

  console.log(formData.get('titre'));  // Pour vérifier les données
  console.log(formData.get('contenue'));
  console.log(formData.get('categorie_id'));
  console.log(formData.get('image'));

  console.log('bbbbb', this.articleData)
  // Envoyer le FormData via le service HTTP
  this.articleService.addArticle(formData).subscribe(
    (response) => {
      console.log('🙏🙏🙏🙏', formData)
      console.log("Réponse du serveur: ✅✅✅✅✅✅", response);
    },
    (error) => {
      console.error("Erreur lors de l'ajout de la réalisation", error);
    }
  );
}

}
