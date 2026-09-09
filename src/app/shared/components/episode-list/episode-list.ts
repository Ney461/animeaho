import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { LastEpisodesResponse } from '@core/models/LastEpisodesResponse';
import { AnimeService } from '@services/anime.service';
import { EpisodeCard } from '@shared/components/episode-card/episode-card';
import { Spinner } from '@shared/components/spinner/spinner';

@Component({
  selector: 'episode-list',
  imports: [EpisodeCard, Spinner],
  templateUrl: './episode-list.html',
})
export class EpisodeList {
  animeService = inject(AnimeService)
  loading = signal(true);

  lastEpisodesList = toSignal(
    this.animeService.getLastEpisodes().pipe(finalize(() => this.loading.set(false))),
    { initialValue: { episodes: [] } as Partial<LastEpisodesResponse> as LastEpisodesResponse }
  )

}
