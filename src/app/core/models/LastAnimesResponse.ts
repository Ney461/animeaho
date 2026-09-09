export interface LastAnimesResponse {
  animes: Anime[];
}

export interface Anime {
  title:  string;
  slug:   string;
  url:    string;
  cover:  string;
  type:   null;
  year:   null;
  status: string;
}

export enum Type {
  Movie = "Movie",
  Ona = "ONA",
  TVAnime = "TV Anime",
}
