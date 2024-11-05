import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }


}
