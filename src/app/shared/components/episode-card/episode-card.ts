import { Component, input } from '@angular/core';
import { ImageFallbackPipe } from '@shared/pipes/image-fallback.pipe';

export interface EpisodeCardItem {
  number: number;
  cover: string;
  title?: string;
}

@Component({
  selector: 'episode-card',
  imports: [ImageFallbackPipe],
  templateUrl: './episode-card.html',
})
export class EpisodeCard {
  episodeNumber = input.required<number>();
  cover = input.required<string>();
  title = input<string | null | undefined>(null);
}
