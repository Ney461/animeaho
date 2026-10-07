import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaItem } from '@core/models/MediaCatalogResp.interface';

@Component({
  selector: 'search-dropdown',
  imports: [RouterLink],
  templateUrl: './search-dropdown.html',
})
export class SearchDropdown {
  results = input.required<MediaItem[]>();
  selected = output<void>();
  seeAll = output<void>();
}
