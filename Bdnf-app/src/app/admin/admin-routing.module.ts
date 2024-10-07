import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ServiceComponent } from './service/service.component';
import { ArticleComponent } from './article/article.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { RealisationComponent } from './realisation/realisation.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { TemoignageComponent } from './temoignage/temoignage.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';

const routes: Routes = [

   {
    path: '', component : MainComponent, children : [
      {path: '', redirectTo : 'login', pathMatch : 'full',},
      {path: 'login', component: LoginComponent,},
      {path: 'home-admin', component: HomeAdminComponent,},
      {path: 'service', component : ServiceComponent,},
      {path: 'article', component : ArticleComponent,},
      {path: 'detail-blog/:uuid', component: DetailBlogComponent,},
      {path: 'commentaire', component : CommentaireComponent,},
      {path: 'realisation', component: RealisationComponent,},
      {path: 'newsletter', component: NewsletterComponent,},
      {path: 'temoignage', component: TemoignageComponent,},
      {path: 'profil', component: ProfilComponent,},
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
