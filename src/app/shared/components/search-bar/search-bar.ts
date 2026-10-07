import { Component, computed, inject, signal } from '@angular/core';
import { SearchDropdown } from '../navbar/search-dropdown/search-dropdown';
import { AnimeService } from '@services/anime.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MediaCatalogResp } from '@core/models/MediaCatalogResp.interface';

@Component({
  selector: 'search-bar',
  imports: [SearchDropdown],
  templateUrl: './search-bar.html',
})
export class SearchBar {

  private readonly animeService = inject(AnimeService);
  private readonly router = inject(Router);

  query = signal('');

  private response = toSignal<{ query: string; data: MediaCatalogResp } | null>(
    toObservable(this.query).pipe(
      switchMap((text) => {
        const query = text.trim();
        return query
          ? timer(300).pipe(
            switchMap(() => this.animeService.searchAnimeByText(query).pipe(
              map(data => ({ query, data })),
              catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                  return of({
                    query,
                    data: {
                      success: false,
                      data: {
                        currentPage: 1,
                        hasNextPage: false,
                        previousPage: null,
                        nextPage: null,
                        foundPages: 0,
                        media: [],
                      },
                    },
                  });
                }

                console.error('Error al buscar anime:', error);
                return of(null);
              })
            ))
          )
          : of(null);
      }),
    ),
    { initialValue: null }
  );

  private currentResponse = computed(() => {
    const response = this.response();
    return response?.query === this.query().trim() ? response.data : null;
  });

  results = computed(() => this.currentResponse()?.data.media.slice(0, 5) ?? []);

  noResults = computed(() => {
    const response = this.currentResponse();
    return this.query().trim().length > 0 && response !== null && response.data.media.length === 0;
  });

  goToCatalog() {
    this.results()
    const search = this.query().trim();

    this.router.navigate(['/catalog'], {
      queryParams: {
        search,
        page: 1
      }
    });

    this.query.set('');

  }

}
