import { Component, inject, OnInit, signal } from '@angular/core';
import { MediaItem } from '@core/models/MediaCatalogResp.interface';
import { AnimeService } from '@services/anime.service';

import { AnimeCard } from '@shared/components/anime-card/anime-card';
import { Spinner } from '@shared/components/spinner/spinner';

@Component({
  selector: 'anime-list',
  imports: [Spinner, AnimeCard],
  templateUrl: './anime-list.html',
})
export class AnimeList implements OnInit {

  private readonly animeService = inject(AnimeService);

  loading = signal<boolean>(true);

  animeList = signal<MediaItem[] | null>(null)

  ngOnInit(): void {
    this.loadLatestAnimesReleased();
  }

  loadLatestAnimesReleased() {
    this.animeService.getLatestAnimesReleased().subscribe({
      next: (resp) => {
        this.animeList.set(resp.data.media);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      }
    })
  }

}
