import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // private apiUrl = 'https://api.bdnf-marketing-solutions.com/api';
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

  allService(): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/get/service/all`, { headers });
  }

  deleteService(uuid: any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any[]>(`${this.apiUrl}/delete/service/${uuid}`, {}, {headers});
  }

  addService(service: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/create/newService`, service, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur:', error);
          return throwError(error);
        })
      );
  }

  updateService(serviceUpdate: any, uuid: any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/update/service/${uuid}`, serviceUpdate, {headers});
  }
}
