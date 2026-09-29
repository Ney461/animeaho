import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Spinner } from '@shared/components/spinner/spinner';
import { AiringAnime } from '@core/models/HomeResponse';

@Component({
  selector: 'on-air-list',
  imports: [RouterLink, Spinner],
  templateUrl: './on-air-list.html',
})
export class OnAirList {

  onAirList = input.required<AiringAnime[]>()
  loadingInput = input.required<boolean>()
  loading = computed<boolean>(this.loadingInput);

}
