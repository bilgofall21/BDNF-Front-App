import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,FooterComponent, HeaderComponent
  ]
})
export class UserModule { }
