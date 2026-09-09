import { Component, inject, signal } from '@angular/core';
import { EpisodeCard } from "../episode-card/episode-card";
import { AnimeService } from '../../../services/anime.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LastEpisodesResponse } from '../../../core/models/LastEpisodesResponse';
import { finalize } from 'rxjs';
import { Spinner } from '../spinner/spinner';

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
