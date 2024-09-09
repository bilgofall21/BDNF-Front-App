import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  confirmAlert(
    title: string,
    confirmButtonText: string = 'Oui',
    cancelButtonText: string = 'Annuler',
    confirmButtonColor: string = '#388E3C',
    cancelButtonColor: string = '#A12825'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor,
      cancelButtonColor,
      confirmButtonText,
      cancelButtonText,
      width: 450,
      padding: 10,
      color: '#ffff',
      background: '#E7DCD6'
    }).then(result => result.isConfirmed);
  }


  successAlert(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#388E3C',
      width: 450,
      padding: 10,
      color: '#ffff',
      background: '#E7DCD6'
    });
  }

  errorAlert(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#388E3C',
      width: 450,
      padding: 10,
      color: '#ffff',
      background: '#E7DCD6'
    });
  }
}
