import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaItem } from '@core/models/MediaCatalogResp.interface';

import { AnimeService } from '@services/anime.service';
import { Spinner } from '@shared/components/spinner/spinner';


@Component({
  selector: 'on-air-list',
  imports: [RouterLink, Spinner],
  templateUrl: './on-air-list.html',
})
export class OnAirList implements OnInit {

  private readonly animeService = inject(AnimeService);

  animeList = signal<MediaItem[]>([]);

  loading = signal(true);

  ngOnInit(): void {
    this.loadAnimes();
  }

  loadAnimes() {
    this.animeService.getAnimesOnAiring().subscribe({
      next: (response) => {
        this.animeList.set(response.data.media);
        this.loading.set(false);
      },
      error: (err) => {
        // console.log(err);
        this.loading.set(false);
      }
    })
  }

}
