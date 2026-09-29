import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { CatalogOptionsResponse } from '@core/models/CatalogOptionsResponse';
import { Params } from '@angular/router';
import { HomeResponse } from '@core/models/HomeResponse';
import { AnimeFilterSearchResponse } from '@core/models/AnimeFilterSearchResponse';
import { AnimeBySlugResponse } from '@core/models/AnimeBySlugResponse';

@Injectable({ providedIn: 'root' })
export class AnimeService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api`;

  getHomeResponse(): Observable<HomeResponse> {
    return this.httpClient.get<HomeResponse>(`${this.apiUrl}/home`)
  }

  getCatalogOptions(): Observable<CatalogOptionsResponse> {
    return this.httpClient.get<CatalogOptionsResponse>(`${this.apiUrl}/catalog/options`);
  }

  getFilteredAnimeResults(params: Params): Observable<AnimeFilterSearchResponse> {

    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined ){
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.httpClient.get<AnimeFilterSearchResponse>(
      `${this.apiUrl}/search/by-filter`,
      {params: httpParams}
    )
  }

  searchAnimeBySlug(slug: string) {
    return this.httpClient.get<AnimeBySlugResponse>(`${this.apiUrl}/anime/${slug}`);
  }

}
