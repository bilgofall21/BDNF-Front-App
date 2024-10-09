import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(
    private http : HttpClient
  ) { }
  private apiUrl = 'https://api.bdnf-marketing-solutions.com/api';
  // private apiUrl = 'http://127.0.0.1:8000/api';

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

  addComment(comment: any): Observable<any> {
    // const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/create/newCommentaire`, comment,)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur:', error);
          return throwError(error);
        })
      );
  }

  getCommentaire(uuidArticle: any):Observable<any>{
     const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/get/commentaire/artclie/all/${uuidArticle}`)
  }

  // getCommentaireById(uuidArticle: any):Observable<any>{
  //   const headers = this.getHeaders();
  //   return this.http.get<any>(`${this.apiUrl}/show/commentaire/${uuidArticle}`)
  // }
}
