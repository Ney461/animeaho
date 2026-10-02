import { Component, computed, inject, signal } from '@angular/core';
import { SearchDropdown } from '../navbar/search-dropdown/search-dropdown';
import { AnimeService } from '@services/anime.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  imports: [SearchDropdown],
  templateUrl: './search-bar.html',
})
export class SearchBar {

  private readonly animeService = inject(AnimeService);
  private readonly router = inject(Router);

  query = signal('');

  private response = toSignal(
    toObservable(this.query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((text) =>
        text.trim() ? this.animeService.searchAnimeByText(text.trim()) : of(null)
      ),
    ),
  )

  results = computed(() => this.response()?.data.media.slice(0, 5) ?? []);

  goToCatalog() {

    const search = this.query().trim();

    this.router.navigate(['/catalog'], {
      queryParams: {
        search,
        page: 1
      }
    });

    this.query.set('');

  }

}
