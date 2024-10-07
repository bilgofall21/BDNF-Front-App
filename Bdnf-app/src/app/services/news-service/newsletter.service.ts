import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  // private apiUrl = 'https://api.bdnf-marketing-solutions.com/api';
  private apiUrl = 'http://127.0.0.1:8000/api';


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

  addNewsletter(newsletter: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/subscribe/newsleter`, newsletter, { headers });
  }
  getAllNewsLetter(): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/getAll/newsleter`, {headers });
  }

  responsNewletter(newsletter: any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/envoie-newsletter`, newsletter, { headers });
  }

}
