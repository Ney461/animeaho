import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

import { environment } from '@environments/environment';
import { MediaCatalogResp } from '@core/models/MediaCatalogResp.interface';
import { LatestEpisodesResp } from '@core/models/LatestEpisodesResp.interface';
import { AnimeDetailResp } from '@core/models/AnimeDetailResp.interface';

@Injectable({ providedIn: 'root' })
export class AnimeService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api`;
  private readonly animeav1Url = 'https://animeav1.com';

  getAnimesOnAiring(): Observable<MediaCatalogResp> {
    return this.httpClient.get<MediaCatalogResp>(`${this.apiUrl}/search/by-url`, {
      params: {
        url: `${this.animeav1Url}/catalogo?status=emision&order=popular`,
      },
    });
  }

  getLatestEpisodes(): Observable<LatestEpisodesResp> {
    return this.httpClient.get<LatestEpisodesResp>(
      `${this.apiUrl}/list/latest-episodes`,
    );
  }

  getLatestAnimesReleased(): Observable<MediaCatalogResp> {
    return this.httpClient.get<MediaCatalogResp>(`${this.apiUrl}/search/by-url`, {
      params: {
        url: `${this.animeav1Url}/catalogo?order=latest_released`,
      },
    });
  }

  getFilteredAnimeResults(paramsInput: Params): Observable<MediaCatalogResp> {
    const queryString = new HttpParams({ fromObject: paramsInput }).toString();

    return this.httpClient.get<MediaCatalogResp>(`${this.apiUrl}/search/by-url`, {
      params: { url: `${this.animeav1Url}/catalogo?${queryString}` },
    });
  }

  searchAnimeBySlug(slug: string): Observable<AnimeDetailResp> {
    return this.httpClient.get<AnimeDetailResp>(`${this.apiUrl}/anime/${slug}`);
  }

  searchAnimeByText(text: string, page = 1): Observable<MediaCatalogResp> {
    return this.httpClient.get<MediaCatalogResp>(`${this.apiUrl}/search`, {
      params: { query: text, page },
    });
  }
}
