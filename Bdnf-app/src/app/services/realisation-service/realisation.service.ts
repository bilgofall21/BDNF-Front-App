import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealisationService {

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


gatAllRealisation(): Observable<any>{
  const headers = this.getHeaders();
  return this.http.get<any>(`${this.apiUrl}/get/realisation/all`, { headers})
}

  addRealistion(realisation: any): Observable<any> {
    const headers = this.getHeaders();
    // console.log('realisation service❌❌', realisation.get('titre'))
    return this.http.post<any>(`${this.apiUrl}/create/newRealisation`, realisation,{ headers })
  }


  addImageRealisation(id: any, image: FormData) {
    console.log('❓❓voir image envoyé', image);
    const headers = this.getHeaders(true); // Passer `true` pour les en-têtes de fichier
    return this.http.post<any>(`${this.apiUrl}/ajouter-image/realisation/${id}`, image, { headers });
  }

updateRealisation(realisation: any, uuid: any): Observable<any> {
  console.log('❓❓voir image envoyé', realisation);
  const headers = this.getHeaders(true);
  return this.http.post<any>(`${this.apiUrl}/update/realisation/${uuid}`, realisation,{ headers })
}

delatRealisation(id: number): Observable<any>{
  const headers = this.getHeaders();
  return this.http.post<any>(`${this.apiUrl}/delete/realisation/${id}`, {}, {headers} )
}

}
