import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addArticle(article: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/create/newArticle`, article,{ headers })

  }
  allArticle():Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/get/articlee/all`, {headers})
  }

  getArticleById(articleId:number): Observable<any> {
    const headers = this.getHeaders();
   return this.http.get<any>(`${this.apiUrl}/show/articlee/${articleId}`, {headers} )
  }

}