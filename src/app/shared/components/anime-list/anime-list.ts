import { Component, inject, signal } from '@angular/core';
import { AnimeService } from '../../../services/anime.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { LastAnimesResponse } from '../../../core/models/LastAnimesResponse';
import { Spinner } from "../spinner/spinner";
import { AnimeCard } from "../anime-card/anime-card";

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
