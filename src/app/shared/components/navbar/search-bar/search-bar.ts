import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';

import { MediaItem } from '@core/models/MediaCatalogResp.interface';
import { AnimeService } from '@services/anime.service';
import { SearchDropdown } from '../search-dropdown/search-dropdown';

type AnimeSearchResponse = {
  query: string;
  media: MediaItem[];
};

@Component({
  selector: 'search-bar',
  imports: [SearchDropdown],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  private readonly animeService = inject(AnimeService);
  private readonly router = inject(Router);

  readonly query = signal('');

  private readonly response = toSignal<AnimeSearchResponse | null>(
    toObservable(this.query).pipe(
      switchMap((text) => this.searchAnime(text.trim())),
    ),
    { initialValue: null },
  );

  private readonly currentResponse = computed(() => {
    const response = this.response();
    return response?.query === this.query().trim() ? response : null;
  });

  readonly results = computed(
    () => this.currentResponse()?.media.slice(0, 5) ?? [],
  );

  readonly noResults = computed(() => {
    const response = this.currentResponse();
    return response !== null && response.media.length === 0;
  });

  private searchAnime(query: string): Observable<AnimeSearchResponse | null> {
    if (!query) {
      return of(null);
    }

    return timer(100).pipe(
      switchMap(() => this.fetchAnimeResults(query)),
    );
  }

  private fetchAnimeResults(
    query: string,
  ): Observable<AnimeSearchResponse | null> {
    return this.animeService.searchAnimeByText(query).pipe(
      map((response) => ({ query, media: response.data.media })),
      catchError((error: unknown) => this.handleSearchError(query, error)),
    );
  }

  private handleSearchError(
    query: string,
    error: unknown,
  ): Observable<AnimeSearchResponse | null> {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      return of({ query, media: [] });
    }

    console.error('Error al buscar anime:', error);
    return of(null);
  }

  goToCatalog(): void {
    const search = this.query().trim();

    this.router.navigate(['/catalog'], {
      queryParams: {
        search,
        page: 1,
      },
    });

    this.query.set('');
  }
}
