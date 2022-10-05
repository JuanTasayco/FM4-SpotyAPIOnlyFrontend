import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(imagen: any): string {
 
    if (!imagen) {
      return "assets/img/noimage.png"
    }

    if (imagen) {
      return imagen;
    } else {
      return "assets/img/noimage.png"
    }
  }

}
