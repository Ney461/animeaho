import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnimeService } from '@services/anime.service';
import { FilterBar, SelectedFilters } from "@shared/components/filter-bar/filter-bar";
import { Pagination } from '@shared/components/pagination/pagination';
import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { finalize } from 'rxjs';
import { AnimeFilterSearchResponse } from '@core/models/AnimeFilterSearchResponse';

@Component({
  selector: 'app-catalog',
  host: {
    class: 'flex flex-1 flex-col'
  },
  imports: [FilterBar, Pagination, AnimeCard, Spinner],
  templateUrl: './catalog.html',
})
export class  Catalog {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private animeService = inject(AnimeService);

  readonly loading = signal(true);

  readonly animeList = signal<Partial<AnimeFilterSearchResponse>>({});
  totalPages = signal<string>('1')

  constructor() {
    this.route.queryParamMap.subscribe(() => {
      this.searchAnimes(this.route.snapshot.queryParams);
    })
  }

  catchFilters(value: SelectedFilters) {

    const { tipo, genero, estado, orden } = value

    const queryParams: Record<string, string | null> = {
      page: '1',
      type: tipo?.length ? tipo.join(',') : null,
      genre: genero?.length ? genero.join(',') : null,
      status: estado || null,
      order: orden || null,
    };

    this.updateUrl(queryParams)

  }

  updateUrl(queryParams: Params | null) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    })
  }

  searchAnimes(queryParams: Params = {}): void {
    this.loading.set(true);

    this.animeService
      .getFilteredAnimeResults(queryParams)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe(response => {

        this.totalPages.set(response.data.foundPages.toString())
        this.animeList.set(response);

      })

  }
}
