import { AfterContentInit, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { EpisodeDataResp } from '@core/models/EpisodeDataResp.interface';
import { AnimeService } from '@services/anime.service';
import { catchError, filter, map, Observable, of, startWith, switchMap } from 'rxjs';
import { Spinner } from '@shared/components/spinner/spinner';

@Component({
  selector: 'app-episode-player',
  imports: [Spinner],
  templateUrl: './episode-player.html',
  host: { class: 'flex flex-1 flex-col' },

})
export class EpisodePlayer {

  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);

  readonly loadError = signal(false);


  readonly episodeData = toSignal<EpisodeDataResp | null>(
    this.route.paramMap.pipe(
      map((params) => ({
        slug: params.get('slug') ?? '',
        number: Number(params.get('number') ?? 1),
      })),
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
