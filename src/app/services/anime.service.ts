import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { CatalogResponse } from '@core/models/CatalogResponse';
import { LastAnimesResponse } from '@core/models/LastAnimesResponse';
import { LastEpisodesResponse } from '@core/models/LastEpisodesResponse';
import { environment } from '@environments/environment';
import { CatalogOptionsResponse } from '@core/models/CatalogOptionsResponse';

@Injectable({ providedIn: 'root' })
export class AnimeService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAnimesOnAir(): Observable<CatalogResponse> {
    const firstPage$ = this.httpClient.get<CatalogResponse>(`${this.apiUrl}/catalog?page=1&status=airing&order=popular`);
    const secondPage$ = this.httpClient.get<CatalogResponse>(`${this.apiUrl}/catalog?page=2&status=airing&order=popular`);
    const thirdPage$ = this.httpClient.get<CatalogResponse>(`${this.apiUrl}/catalog?page=3&status=airing&order=popular`);

    return forkJoin([firstPage$, secondPage$, thirdPage$]).pipe(
      map(([firstPage, secondPage, thirdPage]) => ({
        ...firstPage,
        animes: [...firstPage.animes, ...secondPage.animes, ...thirdPage.animes],
        total_pages: thirdPage.total_pages,
      }))
    );
  }

  getLastEpisodes(): Observable<LastEpisodesResponse> {
    return this.httpClient.get<LastEpisodesResponse>(`${this.apiUrl}/episodes`);
  }

  getLastAnimes(): Observable<LastAnimesResponse> {
    return this.httpClient.get<LastAnimesResponse>(`${this.apiUrl}/animes`);
  }

  getCatalogOptions(): Observable<CatalogOptionsResponse> {
    return this.httpClient.get<CatalogOptionsResponse>(`${this.apiUrl}/catalog/options`);
  }

  getFilteredAnimeResults(): Observable<CatalogResponse> {
    return this.httpClient.get<CatalogResponse>(`${this.apiUrl}/catalog`)
  }

}
