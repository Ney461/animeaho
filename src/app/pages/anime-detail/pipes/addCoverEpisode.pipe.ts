import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addCoverEpisode'
})

export class AddCoverEpisodePipe implements PipeTransform {
  transform(index: number, url: string): string {
    let idAnime = url.split('/').pop()?.split('.')[0];
    let urlCoverEpisode = `https://cdn.animeav1.com/screenshots/${idAnime}/${index}.jpg`

    return urlCoverEpisode;
  }
  
}
