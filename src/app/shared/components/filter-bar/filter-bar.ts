import { Component, inject, OnInit, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnimeService } from '@services/anime.service';
import { FilterOptions } from "../filter-option/filter-options";
import { CatalogOptionsResponse } from '@core/models/CatalogOptionsResponse';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export type SelectedFilters = {
  tipo: string[] | null;
  genero: string[] | null;
  estado: string | null;
  orden: string | null;
};

@Component({
  selector: 'filter-bar',
  imports: [FilterOptions, ReactiveFormsModule],
  templateUrl: './filter-bar.html',
})
export class FilterBar implements OnInit {

  private readonly route = inject(ActivatedRoute);

  private readonly animeService = inject(AnimeService);
  private fb = inject(FormBuilder);

  readonly options = toSignal<CatalogOptionsResponse>(this.animeService.getCatalogOptions());
  readonly activeMobileFilter = signal<string | null>(null);

  readonly filtersForm = this.fb.group(
    {
      tipo: [[] as string[]],
      genero: [[] as string[]],
      estado: ['finished' as string | null],
      orden: ['default' as string | null],
    }
  )

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this.filtersForm.patchValue({
      tipo: params.get('type')?.split(',') ?? [],
      genero: params.get('genre')?.split(',') ?? [],
      estado: params.get('status') ?? 'finished',
      orden: params.get('order') ?? 'default',
    });
  }

  selectedFilters = output<SelectedFilters>();

  onMobileFilterExpansionChange(filterLabel: string, isExpanded: boolean) {
    this.activeMobileFilter.set(isExpanded ? filterLabel : null);
  }

  sendFilters() {
    this.selectedFilters.emit(this.filtersForm.getRawValue());
  }

}
