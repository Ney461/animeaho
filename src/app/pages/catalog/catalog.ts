import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnimeService } from '@services/anime.service';
import { Pagination } from '@pages/catalog/pagination/pagination';
import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { finalize } from 'rxjs';
import { AnimeFilterSearchResponse } from '@core/models/AnimeFilterSearchResponse';
import { FilterBar, SelectedFilters } from './filter-bar/filter-bar';

@Component({
  selector: 'app-catalog',
  host: {
    class: 'flex flex-1 flex-col'
  },
  imports: [FilterBar, Pagination, AnimeCard, Spinner],
  templateUrl: './catalog.html',
})
export class Catalog {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private animeService = inject(AnimeService);
  readonly noMedia = signal<boolean>(false);

  readonly loading = signal(true);

  readonly animeList = signal<Partial<AnimeFilterSearchResponse>>({});
  totalPages = signal<string>('1')

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      if (params.keys.length === 0) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: '1', status: 'finished', order: 'default' },
          replaceUrl: true,
        });
        return;
      }

      // if (params.has('search')) {
      //   const onlySearch = params.keys.length === 2 && params.has('page');
      //   if (!onlySearch) {
      //     this.router.navigate([], {
      //       relativeTo: this.route,
      //       queryParams: {
      //         search: params.get('search'),
      //         page: params.get('page') ?? '1',
      //         replaceUrl: true
      //       }
      //     });
      //     return;
      //   }
      // }

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
      queryParams: { ...queryParams, search: null },
      queryParamsHandling: 'merge'
    })
  }

  searchAnimes(queryParams: Params = {}): void {
    this.loading.set(true);

    const search = String(queryParams['search'] ?? '').trim();
    const page = Number(queryParams['page'] ?? 1);

    const request = search
      ? this.animeService.searchAnimeByText(search, page)
      : this.animeService.getFilteredAnimeResults(queryParams);

    request
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(response => {


        this.noMedia.set(response.data.media.length === 0)


        this.totalPages.set(response.data.foundPages.toString());
        this.animeList.set(response);
        console.log(response);
      });


  }

}
