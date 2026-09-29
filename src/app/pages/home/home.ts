import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { HomeResponse } from '@core/models/HomeResponse';
import { AnimeService } from '@services/anime.service';

import { OnAirList } from '@pages/home/on-air-list/on-air-list';
import { EpisodeList } from '@shared/components/episode-list/episode-list';
import { AnimeList } from '@pages/home/anime-list/anime-list';

@Component({
  selector: 'app-home',
  imports: [OnAirList, EpisodeList, AnimeList],
  templateUrl: './home.html',
})
export class Home implements OnInit {

  private readonly animeService = inject(AnimeService);

  readonly homeResponse = signal<HomeResponse | null>(null);
  readonly airingAnimes = computed(() => this.homeResponse()?.data.airing_animes ?? []);
  readonly latestEpisodes = computed(() =>
    (this.homeResponse()?.data.latest_episodes ?? []).map(({ number, cover, title }) => ({
      number,
      cover,
      title,
    }))
  );
  readonly latestAnimes = computed(() => this.homeResponse()?.data.latest_animes ?? []);

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
