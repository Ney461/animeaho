import { Component, input } from '@angular/core';
import { Media } from '@core/models/AnimeFilterSearchResponse';

import { LatestAnime } from '@core/models/HomeResponse';
import { RouterLink } from '@angular/router';
import { ImageFallbackPipe } from '@shared/pipes/image-fallback.pipe';

@Component({
  selector: 'anime-card',
  imports: [RouterLink, ImageFallbackPipe],
  templateUrl: './anime-card.html',
})
export class AnimeCard {
  anime = input.required<LatestAnime | Media>();

}
