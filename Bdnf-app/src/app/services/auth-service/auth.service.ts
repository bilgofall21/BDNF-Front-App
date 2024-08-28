import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http : HttpClient) {}
private baseUrl = 'http://127.0.0.1:8000/api'
  registerAdmin( registerData: any): Observable<any>{
return this.http.post<any>(`${this.baseUrl}/register`, registerData)
  }
  private getHeaders(): HttpHeaders {
    let token = '';

    // Vérifier si window est défini pour savoir si on est dans un environnement navigateur
    if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token') as string;
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  loginAdmin(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginData).pipe(
      map(response => {
              // Si la connexion réussit, mettez à jour l'état d'authentification
              this.setLoggedIn(true);
              // console.log("ett bbb", this.utilisateurConnecte);
              return response;
            }),
            catchError(error => {
             // En cas d'erreur, vous pouvez gérer l'erreur ici ou la propager
             console.error('Une erreur s\'est produite lors de la connexion :', error);
              return throwError(error);
            })
    )
  }
getProfil(): Observable<any>{
  const headers = this.getHeaders();

  return this.http.get<any>(`${this.baseUrl}/profile`, {headers})
}

updateProfil(user: FormData, id: any): Observable<any> {
  const headers = this.getHeaders();


  return this.http.put<any>(`${this.baseUrl}/update-profile/${id}`, user, { headers });
}

   // Méthode pour mettre à jour l'état de connexion
 setLoggedIn(value: boolean): void {
  localStorage.setItem('isLoggedIn', value.toString());

  this.isLoggedInSubject.next(value);
}

  // Méthode pour récupérer l'état de connexion actuel
isLoggedIn(): boolean {

  return this.isLoggedInSubject.value;

}

logout(): Observable<any>{
  const headers = this.getHeaders();

  return this.http.get<any>(`${this.baseUrl}/logout`, {headers})
}

}
