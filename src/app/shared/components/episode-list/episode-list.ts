import { Component, computed, inject, input, OnInit, signal } from '@angular/core';

import { EpisodeCard } from '@shared/components/episode-card/episode-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { EpisodeCardItem } from '@shared/components/episode-card/episode-card';
import { AnimeService } from '@services/anime.service';
import { LatestEpisodesItem } from '@core/models/LatestEpisodesResp.interface';

@Component({
  selector: 'episode-list',
  imports: [EpisodeCard, Spinner],
  templateUrl: './episode-list.html',
})
export class EpisodeList  implements OnInit {
  private readonly animeService = inject(AnimeService);
  loading = signal<boolean>(true);

  episodeList = signal<LatestEpisodesItem[]>([])

  ngOnInit(): void {
    this.loadLatestEpisodes();
  }

  loadLatestEpisodes() {
    this.animeService.getLatestEpisodes().subscribe({
      next: (response) => {
        this.episodeList.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        // console.log(err);
        this.loading.set(false);
      }
    })
  }

}
