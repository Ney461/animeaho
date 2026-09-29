export interface HomeResponse {
  success: boolean;
  data:    Data;
}

export interface Data {
  airing_animes:   AiringAnime[];
  latest_episodes: LatestEpisode[];
  latest_animes:   LatestAnime[];
}

export interface AiringAnime {
  title: string;
  slug:  string;
}

export interface LatestAnime {
  title:   string;
  cover:   string;
  slug:    string;
  type:    Type;
}

export interface LatestEpisode extends LatestAnime {
  number: number;
}

export enum Type {
  Especial = "Especial",
  Ona = "ONA",
  Ova = "OVA",
  Película = "Película",
  TVAnime = "TV Anime",
}
