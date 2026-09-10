import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnimeService } from '@services/anime.service';
import { FilterOption } from "../filter-option/filter-option";
import { CatalogOptionsResponse } from '@core/models/CatalogOptionsResponse';


@Component({
  selector: 'filter-bar',
  imports: [FilterOption],
  templateUrl: './filter-bar.html',
})
export class FilterBar {

  private readonly animeService = inject(AnimeService);

  readonly options = toSignal<CatalogOptionsResponse>(this.animeService.getCatalogOptions());
  readonly activeMobileFilter = signal<string | null>(null);

  onMobileFilterExpansionChange(filterLabel: string, isExpanded: boolean) {
    this.activeMobileFilter.set(isExpanded ? filterLabel : null);
  }
}
