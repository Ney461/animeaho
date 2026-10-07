export interface AnimeDetailResp {
  success: boolean;
  data: AnimeDetailData;
}

export interface AnimeDetailData {
  title: string;
  alternative_titles: string[];
  status: string;
  rating: string;
  type: string;
  cover: string;
  synopsis: string;
  genres: string[];
  year: number;
  start_date: string;
  end_date: string | null;
  malId: number;
  mature: boolean;
  votes: number;
  next_airing_episode: string | null;
  episodes: AnimeEpisode[];
  url: string;
  related: AnimeRelated[];
}

export interface AnimeEpisode {
  number: number;
  slug: string;
  url: string;
}

export interface AnimeRelated {
  title: string;
  slug: string;
  relation: string;
  cover: string;
  year: number;
  start_date: string;
  url: string;
}
