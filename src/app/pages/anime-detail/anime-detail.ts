import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetailData } from '@core/models/AnimeDetailResp.interface';
import { AnimeService } from '@services/anime.service';

@Component({
  selector: 'anime-detail',
  imports: [],
  templateUrl: './anime-detail.html',
})
export class AnimeDetail implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);

  private animeData = signal<AnimeDetailData|null>(null)

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const slug = params.get('slug');

        if (slug) {
          this.loadAnimeData(slug);
        }

      })
  }

  loadAnimeData(slug: string) {
    this.animeService.searchAnimeBySlug(slug).subscribe({
      next: (data) => {

        this.animeData.set(data.data)

        console.log(this.animeData());

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


}
