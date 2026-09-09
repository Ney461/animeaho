export interface CatalogResponse {
  page: number;
  total: number;
  total_page: number;
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
  // type: Type;
  type: null;
  year: null;
  // status: Status;
  status: null
}

export enum Status {
  airing = "airing",
  finished = "finished",
  upcoming = "upcoming",
  null = ""
}

export enum Type {
  tv = "tv",
  movie = "movie",
  ova = "ova",
  special ="special",
  ona ="ona",
  null = ""
}

export interface Filters {
  page: number;
  letter: null;
  genre: null;
  minYear: null;
  maxYear: null;
  status: null;
  type: null;
  order: null;
}
