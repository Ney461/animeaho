import { Component, inject, OnInit, output, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilterOptions } from '@pages/catalog/filter-bar/filter-options/filter-options';
import { GENRES_OPTIONS as GENRE_OPTIONS, ORDER_OPTIONS, STATUS_OPTIONS, CATEGORY_OPTIONS } from '@core/constants/option-labels';

export type SelectedFilters = {
  category: string[] | null;
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
  private fb = inject(FormBuilder);

  readonly activeMobileFilter = signal<string | null>(null);

  readonly orderOptions = ORDER_OPTIONS;
  readonly genreOptions = GENRE_OPTIONS;
  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  selectedFilters = output<SelectedFilters>();

  readonly filtersForm = this.fb.group(
    {
      category: [[] as string[]],
      genero: [[] as string[]],
      estado: ['finished' as string | null],
      orden: ['default' as string | null],
    }
  )

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this.filtersForm.patchValue({
      category: params.getAll('category'),
      genero: params.getAll('genre'),
      estado: params.get('status') ?? 'finished',
      orden: params.get('order') ?? 'default',
    });
  }

  onMobileFilterExpansionChange(filterLabel: string, isExpanded: boolean) {
    this.activeMobileFilter.set(isExpanded ? filterLabel : null);
  }

  sendFilters() {
    this.selectedFilters.emit(this.filtersForm.getRawValue());
  }

}
