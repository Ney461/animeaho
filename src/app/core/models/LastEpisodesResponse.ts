export interface LastEpisodesResponse {
  episodes: Episode[];
}

export interface Episode {
  number:    number;
  title:     string;
  url:       string;
  thumbnail: string;
}
