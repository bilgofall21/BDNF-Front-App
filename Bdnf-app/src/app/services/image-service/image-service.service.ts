import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor() { }

  getArticleImage(article: any): string {
    // Utilisez une expression régulière pour extraire le chemin relatif correct
    const relativePath = article.image.replace(/^.*public\//, '');
    return `https://bdnf-api.terangacode.com/public/${relativePath}`;
  }

  getRealisationImage(realisa: any): string {
    // Utilisez une expression régulière pour extraire le chemin relatif correct
    const relativePath = realisa.image.replace(/^.*public\//, '');
    return `https://api.bdnf-marketing-solutions.com/public/${relativePath}`;
  }
}
