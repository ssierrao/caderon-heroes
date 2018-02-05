import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myIndexDecorator'})
export class IndexDecorator implements PipeTransform {
  transform(value: number): string {
    let index: any = value + 1;
    switch (index) {
      case 1:
        return index + 'st';
      case 2:
        return index + 'nd';
      case 3:
        return index + 'rd';
      default:
        return index + 'th';
    }
  }
}
