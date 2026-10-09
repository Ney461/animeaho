import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { Observable, catchError, filter, map, of, startWith, switchMap } from 'rxjs';

import { AnimeDetailData } from '@core/models/AnimeDetailResp.interface';
import { AnimeService } from '@services/anime.service';
import { Spinner } from '@shared/components/spinner/spinner';
import { ErrorMessage } from '@shared/components/error-message/error-message';

import { AnimeSidebar } from './anime-sidebar/anime-sidebar';
import { AnimeInfo } from './anime-info/anime-info';
import { AnimeTimeline } from './anime-timeline/anime-timeline';
import { EpisodeToolbar } from './episode-toolbar/episode-toolbar';
import { EpisodeGrid } from './episode-grid/episode-grid';

@Component({
  selector: 'anime-detail',
  imports: [Spinner, AnimeSidebar, AnimeInfo, AnimeTimeline, EpisodeToolbar, EpisodeGrid, ErrorMessage],
  templateUrl: './anime-detail.html',
  host: { class: 'flex flex-1 flex-col' },

})
export class AnimeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);

  readonly loadError = signal(false);
  readonly descending = signal(false);
  readonly episodeQuery = signal('');


  readonly animeData = toSignal<AnimeDetailData | null>(
    this.route.paramMap.pipe(
      map((params) => params.get('slug')),
      filter((slug): slug is string => !!slug),
      switchMap((slug) =>
        this.loadAnime(slug).pipe(startWith(null)),
      ),
    ),
    { initialValue: null },
  );

  readonly episodes = computed(() => {
    const episodes = this.animeData()?.episodes ?? [];

    return [...episodes].sort((a, b) =>
      this.descending() ? b.number - a.number : a.number - b.number,
    );
  });

  readonly filteredEpisodes = computed(() => {
    const query = this.episodeQuery().trim();
    const list = this.episodes();

    return query ? list.filter((ep) => String(ep.number).startsWith(query)) : list;
  });

  private loadAnime(slug: string): Observable<AnimeDetailData | null> {
    this.loadError.set(false);

    return this.animeService.searchAnimeBySlug(slug).pipe(
      map((response) => response.data),
      catchError((error: unknown) => {
        console.error('Error al cargar el detalle del anime:', error);
        this.loadError.set(true);
        return of(null);
      }),
    );
  }





}
