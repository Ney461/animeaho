import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { EMPTY, catchError, finalize, switchMap, tap } from 'rxjs';

import { MediaItem } from '@core/models/MediaCatalogResp.interface';
import { Pagination } from '@pages/catalog/pagination/pagination';
import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { AnimeService } from '@services/anime.service';
import { FilterBar, SelectedFilters } from './filter-bar/filter-bar';

@Component({
  selector: 'app-catalog',
  host: {
    class: 'flex flex-1 flex-col',
  },
  imports: [FilterBar, Pagination, AnimeCard, Spinner],
  templateUrl: './catalog.html',
})
export class Catalog {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);

  readonly noMedia = signal<boolean>(false);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly totalPages = signal('1');
  readonly animeList = signal<MediaItem[]>([]);

  constructor() {
    this.watchQueryParams();
  }

  private watchQueryParams(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => this.handleQueryParams(params)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private handleQueryParams(params: ParamMap) {
    if (params.keys.length === 0) {
      this.setDefaultQueryParams();
      return EMPTY;
    }

    if (this.needsSearchNormalization(params)) {
      this.normalizeSearchParams(params);
      return EMPTY;
    }

    return this.loadAnimes(this.route.snapshot.queryParams);
  }

  private setDefaultQueryParams(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: '1', status: 'finalizado', order: 'default' },
      replaceUrl: true,
    });
  }

  private needsSearchNormalization(params: ParamMap): boolean {
    return (
      params.has('search') &&
      !(params.keys.length === 2 && params.has('page'))
    );
  }

  private normalizeSearchParams(params: ParamMap): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: params.get('search'),
        page: params.get('page') ?? '1',
      },
      replaceUrl: true,
    });
  }

  catchFilters({ category, genero, estado, orden }: SelectedFilters): void {
    this.updateUrl({
      page: '1',
      category: category?.length ? category : null,
      genre: genero?.length ? genero : null,
      status: estado || null,
      order: orden || null,
    });
  }

  private updateUrl(queryParams: Params | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...queryParams, search: null },
      queryParamsHandling: 'merge',
    });
  }

  private loadAnimes(queryParams: Params) {
    this.loading.set(true);
    this.loadError.set(null);

    const search = String(queryParams['search'] ?? '').trim();
    const page = Number(queryParams['page'] ?? 1);

    const request = search
      ? this.animeService.searchAnimeByText(search, page)
      : this.animeService.getFilteredAnimeResults(queryParams);

    return request.pipe(
      tap((response) => {
        this.loadError.set(null);
        this.noMedia.set(response.data.media.length === 0);
        this.totalPages.set(response.data.foundPages.toString());
        this.animeList.set(response.data.media);
      }),
      catchError((error: unknown) => {
        this.clearAnimeResults();

        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.noMedia.set(true);
          return EMPTY;
        }

        this.loadError.set('No se pudo cargar el catálogo. Inténtalo de nuevo.');
        console.error('Error al cargar el catálogo:', error);
        return EMPTY;
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  private clearAnimeResults(): void {
    this.animeList.set([]);
    this.totalPages.set('1');
    this.noMedia.set(false);
  }
}
