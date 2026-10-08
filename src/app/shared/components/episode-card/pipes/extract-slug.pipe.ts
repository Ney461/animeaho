import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractSlug',
})
export class ExtractSlugPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-\d+$/, '');;
  }
}
