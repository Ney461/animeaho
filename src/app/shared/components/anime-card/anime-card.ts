import { Component, input } from '@angular/core';

import { Anime } from '@core/models/LastAnimesResponse';

@Component({
  selector: 'anime-card',
  imports: [],
  templateUrl: './anime-card.html',
})
export class AnimeCard {
  anime = input.required<Anime>();
  fallbackImage = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=85'
}
