import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaItem } from '@core/models/MediaCatalogResp.interface';
import { AnimeService } from '@services/anime.service';

import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { catchError, map, of } from 'rxjs';
import { ErrorMessage } from '@shared/components/error-message/error-message';

@Component({
  selector: 'anime-list',
  imports: [Spinner, AnimeCard, ErrorMessage],
  templateUrl: './anime-list.html',
})
export class AnimeList {

  private readonly animeService = inject(AnimeService);

  readonly loadError = signal(false);

  readonly animeList = toSignal(

    this.animeService.getLatestAnimesReleased().pipe(
      map((resp) => resp.data.media),
      catchError((err) => {
        console.error(err);
        this.loadError.set(true);
        return of(null);
      }),
    ),
    { initialValue: null },
  );

}
