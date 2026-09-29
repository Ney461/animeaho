import { Component, computed, input } from '@angular/core';

import { EpisodeCard } from '@shared/components/episode-card/episode-card';
import { Spinner } from '@shared/components/spinner/spinner';
import { EpisodeCardItem } from '@shared/components/episode-card/episode-card';

@Component({
  selector: 'episode-list',
  imports: [EpisodeCard, Spinner],
  templateUrl: './episode-list.html',
})
export class EpisodeList {
  episodes = input.required<EpisodeCardItem[]>();
  loadingInput = input(false);
  loading = computed(this.loadingInput);
}
