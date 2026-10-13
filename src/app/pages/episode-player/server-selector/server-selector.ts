import { Component, computed, input, signal } from '@angular/core';
import { Download } from '@core/models/EpisodeDataResp.interface';
import { SafeUrlPipe } from '@shared/pipes/safe-url-pipe.pipe';

@Component({
  selector: 'server-selector',
  imports: [SafeUrlPipe],
  templateUrl: './server-selector.html',
  host: { class: 'block w-full' },
})
export class ServerSelector {

  embeds = input.required<Download[]>();

  readonly grouped = computed(() => {
    const groups: Record<string, Download[]> = {};

    for(const item of this.embeds()) {
      (groups[item.type] ??= []).push(item);
    }

    return groups;

  });

  readonly types = computed(() => Object.keys(this.grouped()));

  private readonly picked = signal<Download | null>(null);

  readonly selected = computed(() => this.picked() ?? this.embeds()[0] ?? null);

  select(item: Download) {
    this.picked.set(item)
  }

}
