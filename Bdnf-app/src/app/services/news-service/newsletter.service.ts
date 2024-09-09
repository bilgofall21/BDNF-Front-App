import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

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

  addNewsletter(newsletter: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/subscribe/newsleter`, newsletter, { headers });
  }

}
