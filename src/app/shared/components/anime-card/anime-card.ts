import { Component, input } from '@angular/core';
import { Media } from '@core/models/AnimeFilterSearchResponse';

import { Latest } from '@core/models/HomeResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'anime-card',
  imports: [RouterLink],
  templateUrl: './anime-card.html',
})
export class AnimeCard {
  anime = input.required<Latest | Media>();

  fallbackImage = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=85'

  
}
