import { Component, input } from '@angular/core';
import { Latest } from '@core/models/HomeResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'episode-card',
  imports: [RouterLink],
  templateUrl: './episode-card.html',
})
export class EpisodeCard {
  episode = input.required<Latest>()
  fallbackImage = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=85'
}
