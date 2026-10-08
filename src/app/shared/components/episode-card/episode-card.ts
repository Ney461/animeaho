import { Component, input } from '@angular/core';
import { ImageFallbackPipe } from '@shared/pipes/image-fallback.pipe';
import { RouterLink } from '@angular/router';
import { ExtractSlugPipe } from './pipes/extract-slug.pipe';

export interface EpisodeCardItem {
  number: number;
  cover: string;
  title?: string;
}

@Component({
  selector: 'episode-card',
  imports: [ImageFallbackPipe, RouterLink, ExtractSlugPipe],
  templateUrl: './episode-card.html',
})
export class EpisodeCard {
  episodeNumber = input.required<number>();
  cover = input.required<string>();
  title = input<string | null | undefined>(null);
  slug = input.required<string>();
  url = input<string>();
}
