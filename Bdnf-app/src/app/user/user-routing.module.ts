import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BlogComponent } from './component/blog/blog.component';
import { AboutComponent } from './component/about/about.component';
import { UserServiceComponent } from './component/user-service/user-service.component';
import { RealisationUserComponent } from './component/realisation-user/realisation-user.component';
import { BlogUserComponent } from './component/blog-user/blog-user.component';
import { DetailRealisationComponent } from './component/detail-realisation/detail-realisation.component';

const routes: Routes = [
  { path: '', redirectTo : 'home', pathMatch : 'full',},
  {path: 'home', component: HomeComponent},
  {path: 'blog/:uuid', component: BlogComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user-service', component: UserServiceComponent},
  {path: 'realisation-user', component: RealisationUserComponent},
  {path: 'blog-user', component: BlogUserComponent},
  {path: 'detail-realisation/:uuid', component: DetailRealisationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
