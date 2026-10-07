import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { MediaCatalogResp } from '@core/models/MediaCatalogResp.interface';
import { LatestEpisodesResp } from '@core/models/LatestEpisodesResp.interface';
import { Params } from '@angular/router';
import { AnimeDetailResp } from '@core/models/AnimeDetailResp.interface';

@Injectable({ providedIn: 'root' })
export class AnimeService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api`;
  private readonly animeav1Url = 'https://animeav1.com';

  getAnimesOnAiring(): Observable<MediaCatalogResp> {
    return this.httpClient.get<MediaCatalogResp>(`${this.apiUrl}/search/by-url`, {
      params: { url: `${this.animeav1Url}/catalogo?status=emision&order=popular` }
    })
  }

  getLatestEpisodes(): Observable<LatestEpisodesResp> {
    return this.httpClient.get<LatestEpisodesResp>(`${this.apiUrl}/list/latest-episodes`)
  }

  getLatestAnimesReleased(): Observable<MediaCatalogResp> {
    return this.httpClient.get<MediaCatalogResp>(`${this.apiUrl}/search/by-url`, {
      params: { url: `${this.animeav1Url}/catalogo?order=latest_released` }
    })
  }

  getFilteredAnimeResults(paramsInput: Params): Observable<MediaCatalogResp> {
    const queryString = new HttpParams({ fromObject: paramsInput }).toString();

    return this.httpClient.get<MediaCatalogResp>(`${this.apiUrl}/search/by-url`, {
      params: { url: `${this.animeav1Url}/catalogo?${queryString}` }
    }).pipe(
      catchError(err => {
        console.error('Error en API:', err);

        const emptyResponse: MediaCatalogResp = {
          success: false,
          data: {
            currentPage: 1,
            hasNextPage: false,
            previousPage: null,
            nextPage: null,
            foundPages: 0,
            media: []
          }
        };

        return of(emptyResponse);
      })
    );
  }

  searchAnimeBySlug(slug: string) {
    return this.httpClient.get<AnimeDetailResp>(`${this.apiUrl}/anime/${slug}`);
  }

  searchAnimeByText(text: string, page = 1) {
    return this.httpClient.get<MediaCatalogResp>(
      `${this.apiUrl}/search`, {
      params: { query: text, page }
    }
    )
  }

}
