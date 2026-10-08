import { Component, input } from '@angular/core';
import { AnimeRelated } from '@core/models/AnimeDetailResp.interface';
import { RouterLink } from '@angular/router';
import { ImageFallbackPipe } from '@shared/pipes/image-fallback.pipe';

@Component({
  selector: 'anime-timeline',
  imports: [RouterLink, ImageFallbackPipe],
  templateUrl: './anime-timeline.html',
})
export class AnimeTimeline {

  related = input.required<AnimeRelated[]>()

}
