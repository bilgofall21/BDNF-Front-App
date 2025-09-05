import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  // private apiUrl = 'https://api.bdnf-marketing-solutions.com/api';
  // private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrl = 'https://bdnf-api.terangacode.com/api';




  constructor(private http: HttpClient) {}


  private getHeaders(isFileUpload: boolean = false): HttpHeaders {
    let token = '';

    if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token') as string;
    }

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Inclure le Content-Type uniquement si ce n'est pas une requête de fichier
    if (!isFileUpload) {
      headers = headers.append('Content-Type', 'application/json');
    }

    return headers;
  }




  getCategorie(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/get/categorie/all`, { headers })
      .pipe(
        map((response: any) => {
          //console.log('Response:', response); // Ajoutez cette ligne pour voir la réponse
          return response;
        }),
      );
  }


  addCategorie(categorie: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.apiUrl}/create/newCategorie`, categorie,{ headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur:', error);
          return throwError(error);
        })
      );
  }
  updateCategorie(categorieUpdate: any, uuid: any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/update/categorie/${uuid}`, categorieUpdate, {headers})
  }
  deleteCategorie(uuid: any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any[]>(`${this.apiUrl}/delete/categorie/${uuid}`, {}, {headers})
  }
}
