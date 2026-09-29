import { Pipe, type PipeTransform } from '@angular/core';

const FALLBACK_IMAGE =
  '/images/default/no-image.jpg';

@Pipe({
  name: 'imageFallback',
})
export class ImageFallbackPipe implements PipeTransform {
  transform(imageUrl: string | null | undefined): string {
    return imageUrl || FALLBACK_IMAGE;
  }
}
