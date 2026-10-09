import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

import { EpisodeCard } from '@shared/components/episode-card/episode-card';
import { ErrorMessage } from '@shared/components/error-message/error-message';
import { Spinner } from '@shared/components/spinner/spinner';
import { AnimeService } from '@services/anime.service';

@Component({
  selector: 'episode-list',
  imports: [EpisodeCard, Spinner, ErrorMessage],
  templateUrl: './episode-list.html',
})
export class EpisodeList {
  private readonly animeService = inject(AnimeService);

  readonly loadError = signal(false);

  readonly episodeList = toSignal(
    this.animeService.getLatestEpisodes().pipe(
      map((resp) => resp.data),
      catchError((err) => {
        console.error(err);
        this.loadError.set(true);
        return of(null);
      }),
    ),
    { initialValue: null },
  );
}
