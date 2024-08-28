import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {


  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  allTemoignage(): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/get/temoignage/all`, { headers })
  }



  addTemoignage(service: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/create/newTemoignages`, service,{ headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur:', error);
          return throwError(error);
        })
      );
  }
  deleteTemoignage(uuid: any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any[]>(`${this.apiUrl}/delete/temoignage/${uuid}`, {}, {headers})
  }

  updateService(serviceUpdate: any, uuid: any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/update/temoignage/${uuid}`, serviceUpdate, {headers})
  }
}