import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { catchError, map, of, startWith, switchMap } from 'rxjs';

import { EpisodeDataResp } from '@core/models/EpisodeDataResp.interface';
import { AnimeService } from '@services/anime.service';
import { Spinner } from '@shared/components/spinner/spinner';
import { ErrorMessage } from '@shared/components/error-message/error-message';
import { ServerSelector } from './server-selector/server-selector';
import { EpisodeNavigation } from './episode-navigation/episode-navigation';

@Component({
  selector: 'app-episode-player',
  imports: [Spinner, ErrorMessage, ServerSelector, EpisodeNavigation],
  templateUrl: './episode-player.html',
  host: { class: 'flex flex-1 flex-col' },

})
export class EpisodePlayer {

  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap
  })

  readonly loadError = signal(false);

  readonly slug = computed(() => this.params().get('slug') ?? '');
  readonly number = computed(() => Number(this.params().get('number') ?? 1));

  readonly episodeData = toSignal<EpisodeDataResp | null>(

    toObservable(computed(
      () => ({
        slug: this.slug(),
        number: this.number()
      })
    )).pipe(
      switchMap(({ slug, number }) =>
        this.animeService.searchEpisode(slug, number).pipe(
          catchError(() => {
            this.loadError.set(true);
            return of(null);
          }),
          startWith(null),
        ),
      ),
    ),
    {initialValue: null},
  );

  readonly loading = computed(() =>
    this.episodeData() === null && !this.loadError()
  );



}
