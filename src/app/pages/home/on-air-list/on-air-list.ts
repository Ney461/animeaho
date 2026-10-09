import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { catchError, map, of } from 'rxjs';

import { AnimeService } from '@services/anime.service';
import { ErrorMessage } from '@shared/components/error-message/error-message';
import { Spinner } from '@shared/components/spinner/spinner';

@Component({
  selector: 'on-air-list',
  imports: [RouterLink, Spinner, ErrorMessage],
  templateUrl: './on-air-list.html',
})

export class OnAirList {

  private readonly animeService = inject(AnimeService);

  readonly loadError = signal(false);

  readonly animeList = toSignal(
    this.animeService.getAnimesOnAiring().pipe(
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
