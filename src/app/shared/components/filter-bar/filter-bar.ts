import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnimeService } from '@services/anime.service';
import { FilterOptions } from "../filter-option/filter-options";
import { CatalogOptionsResponse } from '@core/models/CatalogOptionsResponse';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'filter-bar',
  imports: [FilterOptions, ReactiveFormsModule],
  templateUrl: './filter-bar.html',
})
export class FilterBar {

  private readonly animeService = inject(AnimeService);
  private fb = inject(FormBuilder);

  readonly options = toSignal<CatalogOptionsResponse>(this.animeService.getCatalogOptions());
  readonly activeMobileFilter = signal<string | null>(null);

  readonly filtersForm = this.fb.group(
    {
      tipo: [[] as string[]],
      genero: [[] as string[]],
      estado: [null as string | null],
      orden: [null as string | null],
    }
  )

  onMobileFilterExpansionChange(filterLabel: string, isExpanded: boolean) {
    this.activeMobileFilter.set(isExpanded ? filterLabel : null);
  }

  applyFilters() {
    console.log(this.filtersForm.value);
  }
}
