export interface CatalogResponse {
  page: number;
  total: number;
  items_on_page: number;
  per_page: number;
  total_pages: number;
  filters: Filters;
  animes: Anime[];
}

export interface Anime {
  title: string;
  slug: string;
  url: string;
  cover: string;
  type: AnimeType;
  year: number | null;
  status: AnimeStatus;
}

export type AnimeType =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "";

export type AnimeStatus =
  | "airing"
  | "finished"
  | "upcoming"
  | "unknown"
  | "";

export interface Filters {
  page: number;
  letter: string | null;
  genre: string[] | null;
  minYear: number | null;
  maxYear: number | null;
  status: AnimeStatus | null;
  type: AnimeType | null;
  order: CatalogOrder | null;
}

export type CatalogOrder =
  | "default"
  | "score"
  | "popular"
  | "title"
  | "recent"
  | "premieres";
