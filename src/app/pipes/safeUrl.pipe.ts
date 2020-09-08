import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';


@Pipe({
  name: 'videoUrl'
})
export class videoUrl implements PipeTransform {
   


  constructor( private domSanitizer:DomSanitizer ){ }

  /*i return in a safe way the youtube url plus the video id to have the complete url*/
  transform( value: string, url: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}
