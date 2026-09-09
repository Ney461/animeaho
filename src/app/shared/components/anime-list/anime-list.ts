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
  animeService = inject(AnimeService)
  loading = signal(true);

  lastAnimesList = toSignal(
    this.animeService.getLastAnimes().pipe(finalize(() => this.loading.set(false))),
    { initialValue: { episodes: [] } as Partial<LastAnimesResponse> as LastAnimesResponse }
  )
}
