import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AnimeService } from '@services/anime.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-anime-detail',
  imports: [],
  templateUrl: './anime-detail.html',
})
export class AnimeDetail {
  slug = input.required<string>();
  private readonly animeService = inject(AnimeService);

  readonly anime = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) => this.animeService.searchAnimeBySlug(slug))
    ),
    { initialValue: undefined }
  );
}
