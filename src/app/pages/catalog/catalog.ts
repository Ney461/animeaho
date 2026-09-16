import { AfterContentInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilterBar, SelectedFilters } from "@shared/components/filter-bar/filter-bar";
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-catalog',
  host: {
    class: 'flex flex-1 flex-col'
  },
  imports: [FilterBar, Pagination],
  templateUrl: './catalog.html',
})
export class Catalog implements AfterContentInit {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngAfterContentInit(): void {

  }

  catchFilters(value: SelectedFilters) {

    const { tipo, genero, estado, orden } = value

    const queryParams: Record<string, string | null> = {
      page: '1',
      type: tipo?.length ? tipo.join(',') : null,
      genre: genero?.length ? genero.join(',') : null,
      status: estado || null,
      order: orden || null,
    };

    this.updateUrl(queryParams)

  }

  updateUrl(queryParams: Params | null) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    })
  }

}
