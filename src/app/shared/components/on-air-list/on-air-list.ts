import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { CatalogResponse } from '@core/models/CatalogResponse';
import { AnimeService } from '@services/anime.service';
import { Spinner } from '@shared/components/spinner/spinner';

@Component({
  selector: 'on-air-list',
  imports: [RouterLink, Spinner],
  templateUrl: './on-air-list.html',
})
export class OnAirList {
  animeService = inject(AnimeService);
  loading = signal(true);
  animesOnAirList = toSignal(
    this.animeService.getAnimesOnAir().pipe(finalize(() => this.loading.set(false))),
    { initialValue: { animes: [] } as Partial<CatalogResponse> as CatalogResponse }
  )
}
