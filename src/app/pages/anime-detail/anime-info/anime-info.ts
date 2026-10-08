import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GENRES_OPTIONS } from '@core/constants/option-labels';

const normalize = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

const GENRE_VALUE_BY_LABEL = new Map(
  GENRES_OPTIONS.map((option) => [normalize(option.label), option.value]),
);

@Component({
  selector: 'app-anime-info',
  imports: [RouterLink],
  templateUrl: './anime-info.html',
})
export class AnimeInfo {
  title = input.required<string>();
  category = input.required<string>();
  alternativeTitles = input.required<string[]>();
  synopsis = input.required<string>();
  genres = input.required<string[]>();
  year = input.required<number>()

  getGenreValue(genreLabel: string): string | null {
    return GENRE_VALUE_BY_LABEL.get(normalize(genreLabel)) ?? null;
  }
}
