import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RangePipe } from '@shared/pipes/range-pipe';

@Component({
  selector: 'pagination',
  imports: [RangePipe],
  templateUrl: './pagination.html',
})
export class Pagination {

  totalPages = input.required<string>()
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly currentPage = signal(1);
  readonly isNavigating = signal(false);

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.currentPage.set(Number(params.get('page') ?? 1));
    });
  }

  async navigateToPage(page: number): Promise<void> {
    if (this.isNavigating() || this.currentPage() === page) {
      return;
    }

    this.isNavigating.set(true);

    try {
      await this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge'
      });
    } finally {
      this.isNavigating.set(false);
    }
  }

}
