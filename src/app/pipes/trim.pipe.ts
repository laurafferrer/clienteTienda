// Importa las clases necesarias de Angular para crear un filtro (Pipe).
import { Pipe, PipeTransform } from '@angular/core';

// Define el filtro personalizado llamado 'TrimPipe'.
@Pipe({
  name: 'trimming' // Nombre del filtro que se utilizará en las plantillas HTML.
})
export class TrimPipe implements PipeTransform {

  // Implementa el método requerido por la interfaz PipeTransform.
  // Este método transforma el texto según la lógica del filtro.
  transform(textToTrim: string | null | undefined, longitud: number = 20): string {
    // Verifica si el texto es nulo o indefinido y retorna una cadena vacía en ese caso.
    if (!textToTrim) {
      return '';
    }

    // Verifica si la longitud del texto es mayor que la longitud deseada.
    if (textToTrim.length > longitud) {
      // Si es mayor, corta el texto y agrega "..." al final.
      return textToTrim.substring(0, longitud) + '...';
    } else {
      // Si es igual o menor, retorna el texto sin cambios.
      return textToTrim;
    }
  }

}
