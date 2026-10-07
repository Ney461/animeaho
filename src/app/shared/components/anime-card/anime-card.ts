import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaItem } from '@core/models/MediaCatalogResp.interface';
import { ImageFallbackPipe } from '@shared/pipes/image-fallback.pipe';

@Component({
  selector: 'anime-card',
  imports: [RouterLink, ImageFallbackPipe],
  templateUrl: './anime-card.html',
})
export class AnimeCard {
  anime = input.required<MediaItem>();
}
