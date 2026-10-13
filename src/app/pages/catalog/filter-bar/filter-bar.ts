import { Component, computed, inject, OnDestroy, OnInit, output, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
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
export class FilterBar implements OnInit, OnDestroy {

  private readonly route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private readonly desktopMedia = typeof window === 'undefined'
    ? null
    : window.matchMedia('(min-width: 64rem)');

  readonly activeMobileFilter = signal<string | null>(null);
  readonly isDesktop = signal(this.desktopMedia?.matches ?? false);

  readonly orderOptions = ORDER_OPTIONS;
  readonly genreOptions = GENRE_OPTIONS;
  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  selectedFilters = output<SelectedFilters>();

  readonly filtersForm = this.fb.group(
    {
      category: [[] as string[]],
      genero: [[] as string[]],
      estado: ['finalizado' as string | null],
      orden: ['default' as string | null],
    }
  )

  private readonly currentFilters = toSignal(this.filtersForm.valueChanges, {
    initialValue: this.filtersForm.getRawValue(),
  });

  readonly selectedCategoryCount = computed(() => this.currentFilters().category?.length ?? 0);
  readonly selectedGenreCount = computed(() => this.currentFilters().genero?.length ?? 0);
  readonly selectedStatus = computed(() => this.currentFilters().estado ?? '');
  readonly selectedOrder = computed(() => this.currentFilters().orden ?? '');
  readonly selectedStatusLabel = computed(() =>
    this.statusOptions.find((option) => option.value === this.selectedStatus())?.label ?? '',
  );
  readonly selectedOrderLabel = computed(() =>
    this.orderOptions.find((option) => option.value === this.selectedOrder())?.label ?? '',
  );
  readonly totalSelectedCount = computed(
    () =>
      this.selectedCategoryCount() +
      this.selectedGenreCount() +
      Number(this.selectedStatus().length > 0) +
      Number(this.selectedOrder().length > 0),
  );

  private readonly onViewportChange = (event: MediaQueryListEvent) => {
    this.isDesktop.set(event.matches);
  };

  ngOnInit(): void {
    this.desktopMedia?.addEventListener('change', this.onViewportChange);

    const params = this.route.snapshot.queryParamMap;

    this.filtersForm.patchValue({
      category: params.getAll('category'),
      genero: params.getAll('genre'),
      estado: params.get('status') ?? 'finalizado',
      orden: params.get('order') ?? 'default',
    });
  }

  ngOnDestroy(): void {
    this.desktopMedia?.removeEventListener('change', this.onViewportChange);
  }

  onMobileFilterExpansionChange(filterLabel: string, isExpanded: boolean) {
    this.activeMobileFilter.set(isExpanded ? filterLabel : null);
  }

  sendFilters() {
    this.selectedFilters.emit(this.filtersForm.getRawValue());
  }

}
