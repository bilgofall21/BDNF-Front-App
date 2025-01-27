import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrl = 'https://bdnf-api.terangacode.com/api';
  // private apiUrl = 'https://api.bdnf-marketing-solutions.com/api';

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



  addArticle(article: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/create/newArticle`, article,{ headers })
  }

addArticleImag(id: any, image: FormData): Observable<any> {
  const headers = this.getHeaders(true);
  // return this.http.post<any>(`${this.apiUrl}/ajouter-image/article/${id}`, image,{ headers })
  return this.http.post<any>(`${this.apiUrl}/ajouter-image/article/${id}`, image,{ headers })
}

updateArticle(article: any, uuid: any ): Observable<any>{
  const headers = this.getHeaders(true);
  return this.http.post<any>(`${this.apiUrl}/update/article/${uuid}`, article, { headers })
}
delateArice(uuid: any): Observable<any>{
  const headers = this.getHeaders();
  return this.http.post<any>(`${this.apiUrl}/delete/article/${uuid}`, {}, { headers })
}

  allArticle():Observable<any>{
    const headers = this.getHeaders();

    return this.http.get(`${this.apiUrl}/get/article/all`, {headers})
  }

  getArticleById(articleId:number): Observable<any> {
    const headers = this.getHeaders();
   return this.http.get<any>(`${this.apiUrl}/show/article/${articleId}`, {headers} )
  }

}
