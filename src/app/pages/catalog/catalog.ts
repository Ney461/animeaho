import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { catchError, filter, map, Observable, of, startWith, switchMap, tap } from 'rxjs';

import { MediaCatalogData } from '@core/models/MediaCatalogResp.interface';
import { Pagination } from '@pages/catalog/pagination/pagination';
import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { ErrorMessage } from '@shared/components/error-message/error-message';
import { Spinner } from '@shared/components/spinner/spinner';
import { AnimeService } from '@services/anime.service';
import { FilterBar, SelectedFilters } from './filter-bar/filter-bar';

const EMPTY_CATALOG: MediaCatalogData = {
  currentPage: 1,
  hasNextPage: false,
  previousPage: null,
  nextPage: null,
  foundPages: 1,
  media: [],
};

@Component({
  selector: 'app-catalog',
  host: { class: 'flex flex-1 flex-col' },
  imports: [FilterBar, Pagination, AnimeCard, Spinner, ErrorMessage],
  templateUrl: './catalog.html',
})
export class Catalog {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);

  readonly loadError = signal<string | null>(null);

  readonly catalog = toSignal<MediaCatalogData | null>(
    this.route.queryParamMap.pipe(
      filter((params) => !this.redirectIfNeeded(params)),
      tap(() => this.loadError.set(null)),
      switchMap(() =>
        this.loadAnimes(this.route.snapshot.queryParams).pipe(startWith(null)),
      ),
    ),
    { initialValue: null },
  );

  catchFilters({ category, genero, estado, orden }: SelectedFilters): void {
    this.updateUrl({
      page: '1',
      category: category?.length ? category : null,
      genre: genero?.length ? genero : null,
      status: estado || null,
      order: orden || null,
    });
  }

  private loadAnimes(queryParams: Params): Observable<MediaCatalogData> {
    const search = String(queryParams['search'] ?? '').trim();
    const page = Number(queryParams['page'] ?? 1);

    const request = search
      ? this.animeService.searchAnimeByText(search, page)
      : this.animeService.getFilteredAnimeResults(queryParams);

    return request.pipe(
      map((response) => response.data),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          return of(EMPTY_CATALOG);
        }

        console.error('Error al cargar el catálogo:', error);
        this.loadError.set('No se pudo cargar el catálogo. Inténtalo de nuevo.');
        return of(EMPTY_CATALOG);
      }),
    );
  }

  private redirectIfNeeded(params: ParamMap): boolean {
    if (params.keys.length === 0) {
      this.replaceQueryParams({ page: '1', status: 'finalizado', order: 'default' });
      return true;
    }

    const onlySearchAndPage = params.keys.length === 2 && params.has('page');

    if (params.has('search') && !onlySearchAndPage) {
      this.replaceQueryParams({
        search: params.get('search'),
        page: params.get('page') ?? '1',
      });
      return true;
    }

    return false;
  }

  private replaceQueryParams(queryParams: Params): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true,
    });
  }

  private updateUrl(queryParams: Params): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...queryParams, search: null },
      queryParamsHandling: 'merge',
    });
  }
}
