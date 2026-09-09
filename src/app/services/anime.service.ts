import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { CatalogResponse } from '../core/models/CatalogResponse';
import { LastEpisodesResponse } from '../core/models/LastEpisodesResponse';
import { LastAnimesResponse } from '../core/models/LastAnimesResponse';

@Injectable({ providedIn: 'root' })
export class AnimeService {

  private http = inject(HttpClient)
  private url = 'https://animeav1-backend-no-oficial.vercel.app'
  // url = 'http://127.0.0.1:8000'

  getAnimesOnAir(): Observable<CatalogResponse> {
    const page1$ = this.http.get<CatalogResponse>(`${this.url}/catalog?page=1&status=airing&order=popular`);
    const page2$ = this.http.get<CatalogResponse>(`${this.url}/catalog?page=2&status=airing&order=popular`);
    const page3$ = this.http.get<CatalogResponse>(`${this.url}/catalog?page=3&status=airing&order=popular`);

    return forkJoin([page1$, page2$, page3$]).pipe(
      map(([res1, res2, res3]) =>({
        ...res1,
        animes: [...res1.animes, ...res2.animes, ...res3.animes],
        total_pages: res3.total_pages
      }))
    )
  }

  getLastEpisodes(): Observable<LastEpisodesResponse> {
    return this.http.get<LastEpisodesResponse>(`${this.url}/episodes`)
  }

  getLastAnimes(): Observable<LastAnimesResponse> {
    return this.http.get<LastAnimesResponse>(`${this.url}/animes`)
  }

}
