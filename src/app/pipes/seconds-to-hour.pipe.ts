import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHour'
})
export class SecondsToHourPipe implements PipeTransform {
  seconds = 0;
  // TODO Unused pipe
  transform(value: number, ...args: unknown[]): string {
    const time = new Date(value * 1000);
    return `${time.getHours() - 3}:${time.getMinutes()}:${time.getSeconds()}`;
  }

}
