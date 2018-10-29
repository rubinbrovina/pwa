import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeURIComponent'
})
export class DecodeURIComponentPipe implements PipeTransform {
    isString (value: any) {
  
        return typeof value === 'string';
      }

  transform (input: any) {
    
    if (!this.isString(input)) {
      return input;
    }
    
    return decodeURIComponent(input);
  }
}