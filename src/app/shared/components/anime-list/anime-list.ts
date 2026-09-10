import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { LastAnimesResponse } from '@core/models/LastAnimesResponse';
import { AnimeService } from '@services/anime.service';
import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';

@Component({
  selector: 'anime-list',
  imports: [Spinner, AnimeCard],
  templateUrl: './anime-list.html',
})
export class AnimeList {
  private readonly animeService = inject(AnimeService);
  readonly loading = signal(true);

  readonly animeResponse = toSignal(
    this.animeService.getLastAnimes().pipe(finalize(() => this.loading.set(false))),
    { initialValue: { animes: [] } as LastAnimesResponse }
  );
}
