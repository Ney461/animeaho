import { Component, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { AnimeService } from '@services/anime.service';
import { EpisodeCard } from '@shared/components/episode-card/episode-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { Latest } from '@core/models/HomeResponse';

@Component({
  selector: 'episode-list',
  imports: [EpisodeCard, Spinner],
  templateUrl: './episode-list.html',
})
export class EpisodeList {
  latestEpisodes = input.required<Latest[]>()
  loadingInput = input.required<boolean>();
  loading = computed(this.loadingInput);

  // lastEpisodesList = toSignal(
  //   this.animeService.getLastEpisodes().pipe(finalize(() => this.loading.set(false))),
  //   { initialValue: { episodes: [] } as Partial<LastEpisodesResponse> as LastEpisodesResponse }
  // )

}
