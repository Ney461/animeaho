export interface HomeResponse {
  success: boolean;
  data:    Data;
}

export interface Data {
  airing_animes:   AiringAnime[];
  latest_episodes: Latest[];
  latest_animes:   Latest[];
}

export interface AiringAnime {
  title: string;
  slug:  string;
}

export interface Latest {
  title:   string;
  cover:   string;
  slug:    string;
  type:    Type;
  number?: number;
}

export enum Type {
  Especial = "Especial",
  Ona = "ONA",
  Ova = "OVA",
  Película = "Película",
  TVAnime = "TV Anime",
}
