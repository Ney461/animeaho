import { Component, input } from '@angular/core';
import { Episode } from '../../../core/models/LastEpisodesResponse';

@Component({
  selector: 'episode-card',
  imports: [],
  templateUrl: './episode-card.html',
})
export class EpisodeCard {
  episode = input.required<Episode>()
  fallbackImage = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=85'
}
