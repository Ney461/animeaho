import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AnimeService } from '@services/anime.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'episode-navigation',
  imports: [RouterLink],
  templateUrl: './episode-navigation.html',
})
export class EpisodeNavigation {

  private readonly animeService = inject(AnimeService);

  readonly slug = input.required<string>();
  readonly currentNumber = input.required<number>();

  private readonly numbers = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        this.animeService.searchAnimeBySlug(slug).pipe(
          map((resp) => resp.data.episodes.map((ep) => ep.number)),
          catchError(() => of([] as number[])),
        ),
      ),
    ),
    {
      initialValue: [] as number[]
    },
  );

  readonly hasPrev = computed(() => this.numbers().includes(this.currentNumber() - 1));
  readonly hasNext = computed(() => this.numbers().includes(this.currentNumber() + 1));

}
