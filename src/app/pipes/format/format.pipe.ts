import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let date = new Date(value);
    let d = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    return d;
  }

}
