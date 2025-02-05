import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textEditor',
  standalone: true
})
export class TextEditorPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    return value.replace(/\n/g, '<br>');
  }

}
