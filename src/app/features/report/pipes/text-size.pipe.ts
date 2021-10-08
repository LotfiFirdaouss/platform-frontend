import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSize'
})
export class TextSizePipe implements PipeTransform {

  transform(val:string , length?: any):string {
    return (val?.length>length)? val.slice(0, length)+'...': val;
  }

}
