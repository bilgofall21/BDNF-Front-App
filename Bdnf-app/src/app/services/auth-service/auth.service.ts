import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getInitialLoginState());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http : HttpClient) {}
// private baseUrl = 'https://api.bdnf-marketing-solutions.com/api'
// private baseUrl = 'http://127.0.0.1:8000/api';
private baseUrl = 'https://bdnf-api.terangacode.com/api';

  registerAdmin( registerData: any): Observable<any>{
    //console.log('😊😊😊')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${this.baseUrl}/login`, loginData, { headers }).pipe(
    map(response => {
      if(response.access_token){
        this.setLoggedIn(true, response.access_token); // Stock le token
      }
      return response;

    }),
    catchError(error => {
      console.error('Erreur lors de la connexion :', error);
      return throwError(error);
    })
  );
}

getProfil(): Observable<any>{
  const headers = this.getHeaders();

  return this.http.get<any>(`${this.baseUrl}/profile`, {headers})
}

updateProfil(user: any): Observable<any> {
  const headers = this.getHeaders();


  return this.http.put<any>(`${this.baseUrl}/update-profile`, user, { headers });
}

// Méthode pour récupérer l'état initial de connexion
private getInitialLoginState(): boolean {
  if(typeof window !== 'undefined' && localStorage.getItem('isLoggedIn')){
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  return false;
}



setLoggedIn(value: boolean, token: string | null = null): void {
  localStorage.setItem('isLoggedIn', value.toString());
  if (token) {
    localStorage.setItem('access_token', token);
  } else if (!value) {
    localStorage.removeItem('access_token'); // Supprime le token si déconnexion
  }
  this.isLoggedInSubject.next(value);
}

//    // Méthode pour mettre à jour l'état de connexion
//  setLoggedIn(value: boolean): void {
//   localStorage.setItem('isLoggedIn', value.toString());

//   this.isLoggedInSubject.next(value);
// }

  // Méthode pour récupérer l'état de connexion actuel
isLoggedIn(): boolean {
  return this.isLoggedInSubject.value;

}

logout(): Observable<any>{
  const headers = this.getHeaders();
  return this.http.get<any>(`${this.baseUrl}/logout`, {headers}).pipe(
    map(response => {
      this.setLoggedIn(false);
      return response;
    }),
    catchError(error => {
      console.error('Erreur lors de la deconnexion :', error);
      return throwError(error);
    })
  );
}

}
