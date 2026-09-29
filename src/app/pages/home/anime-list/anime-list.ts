import { Component, computed, input } from '@angular/core';

import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { LatestAnime } from '@core/models/HomeResponse';

@Component({
  selector: 'anime-list',
  imports: [Spinner, AnimeCard],
  templateUrl: './anime-list.html',
})
export class AnimeList {

  latestAnime = input.required<LatestAnime[]>()
  loadingInput = input.required<boolean>();
  loading = computed(this.loadingInput);
  
}
