import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'rating'
})
export class rating implements PipeTransform {

  constructor(){ }

  transform( value: number): any {
    value = value/100;
    return (Math.round(value)+"%");
  }

}
