import { Component, input, signal } from '@angular/core';
import { ImageFallbackPipe } from '@shared/pipes/image-fallback.pipe';
import { StartRating } from './start-rating/start-rating';
import { StatusSvgPipe } from '@shared/pipes/status-svg.pipe';

@Component({
  selector: 'anime-sidebar',
  imports: [ImageFallbackPipe, StartRating, StatusSvgPipe],
  templateUrl: './anime-sidebar.html',
  host: { class: 'block' },
})
export class AnimeSidebar {
  animeCover = input.required<string>();
  rating = input.required<string>()
  status = input.required<string>()
  
}
