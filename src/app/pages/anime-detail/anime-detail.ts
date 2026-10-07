import { Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { catchError, EMPTY, filter, map, switchMap } from 'rxjs';

import { AnimeService } from '@services/anime.service';

@Component({
  selector: 'anime-detail',
  imports: [],
  templateUrl: './anime-detail.html',
})
export class AnimeDetail {

  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);

  private readonly loadedAnime = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('slug')),
      filter((slug): slug is string => !!slug),
      switchMap((slug) => this.animeService.searchAnimeBySlug(slug).pipe(
        map((resp) => resp.data),
        catchError(() => EMPTY),
      )),
    ),
    { initialValue: null },
  );

  readonly animeData = linkedSignal(() => this.loadedAnime());
}
