import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Media } from '@core/models/AnimeFilterSearchResponse';

@Component({
  selector: 'search-dropdown',
  imports: [RouterLink],
  templateUrl: './search-dropdown.html',
})
export class SearchDropdown {

  results = input<Media[]>()

  selected = output<void>();

  seeAll = output<void>();

}
