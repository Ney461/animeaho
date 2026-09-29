import { Component, computed, inject, input, signal } from '@angular/core';

import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { Latest } from '@core/models/HomeResponse';

@Component({
  selector: 'anime-list',
  imports: [Spinner, AnimeCard],
  templateUrl: './anime-list.html',
})
export class AnimeList {

  latestAnime = input.required<Latest[]>()
  loadingInput = input.required<boolean>();
  loading = computed(this.loadingInput);


  // readonly animeResponse = toSignal(
  //   this.animeService.getLastAnimes().pipe(finalize(() => this.loading.set(false))),
  //   { initialValue: { animes: [] } as LastAnimesResponse }
  // );
}
