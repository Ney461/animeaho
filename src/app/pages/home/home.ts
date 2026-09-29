import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { HomeResponse, Latest } from '@core/models/HomeResponse';
import { AnimeService } from '@services/anime.service';

import { OnAirList } from '@shared/components/on-air-list/on-air-list';
import { Spinner } from '@shared/components/spinner/spinner';
import { EpisodeList } from '@shared/components/episode-list/episode-list';
import { AnimeList } from '@shared/components/anime-list/anime-list';

@Component({
  selector: 'app-home',
  imports: [OnAirList, Spinner, EpisodeList, AnimeList],
  templateUrl: './home.html',
})
export class Home implements OnInit {

  private readonly animeService = inject(AnimeService);

  readonly homeResponse = signal<HomeResponse | null>(null);
  readonly airingAnimes = computed(() => this.homeResponse()?.data.airing_animes ?? []);
  readonly latestEpisodes = computed(() => this.homeResponse()?.data.latest_episodes ?? [] as Latest[]);
  readonly latestAnimes = computed(() => this.homeResponse()?.data.latest_animes ?? [] as Latest[]);

  readonly loadingOnAir = signal<boolean>(true);
  readonly loadingEpisodes = signal<boolean>(true);
  readonly loadingAnimes = signal<boolean>(true);
  readonly error = signal<boolean>(false);

  ngOnInit(): void {
    this.loadHome();
  }

  loadHome(): void {
    this.loadingOnAir.set(true);
    this.loadingEpisodes.set(true);
    this.loadingAnimes.set(true);
    this.error.set(false);
    this.homeResponse.set(null);

    this.animeService.getHomeResponse().subscribe({
      next: (response: HomeResponse) => {
        this.homeResponse.set(response);
        console.log('Animes en emisión:', response.data.airing_animes);
        this.loadingOnAir.set(false);
        this.loadingEpisodes.set(false);
        this.loadingAnimes.set(false);
      },
      error: (error) => {
        console.log('Error loading home:', error);
        this.error.set(true);
        this.loadingOnAir.set(false);
        this.loadingEpisodes.set(false);
        this.loadingAnimes.set(false);
      }
    });
  }
}
