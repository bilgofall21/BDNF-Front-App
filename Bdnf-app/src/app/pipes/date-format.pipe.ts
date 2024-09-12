import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';            // Import du format
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date): string {
    if(!value) return '';
    const date = new Date(value);
    return format(date, 'dd MMMM yyyy', {locale: fr})
  }

}
