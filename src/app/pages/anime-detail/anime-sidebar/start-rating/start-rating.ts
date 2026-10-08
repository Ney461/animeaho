import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'start-rating',
  imports: [],
  templateUrl: './start-rating.html',
  host: { class: 'block' },
})
export class StartRating {

  rating = input.required<number | string | null>();

  readonly halves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  readonly activeHalf = computed(() => {
    const value = Number(this.rating())
    return Number.isFinite(value) ? Math.min(10, Math.max(0, Math.round(value))) : 0;
  })

}
