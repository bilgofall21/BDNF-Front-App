import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(
    private http : HttpClient
  ) { }
  // private apiUrl = 'https://api.bdnf-marketing-solutions.com/api';
  private apiUrl = 'http://127.0.0.1:8000/api';



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
     // const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/get/commentaire/artclie/all/${uuidArticle}`)
  }
}
