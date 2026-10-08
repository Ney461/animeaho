import { Component, computed, model, signal } from '@angular/core';

@Component({
  selector: 'episode-toolbar',
  templateUrl: './episode-toolbar.html',
})
export class EpisodeToolbar {
  readonly descending = model(false);

  readonly episodeQuery = model('');
  readonly cleanNumberEp = computed(() => this.episodeQuery().trim() !== '');

  toggleOrder() {
    this.descending.update((value) => !value);
  }

  onSearch(event: Event) {
    this.episodeQuery.set((event.target as HTMLInputElement).value);


  }

  clear() {
    this.episodeQuery.set('');
  }


}
