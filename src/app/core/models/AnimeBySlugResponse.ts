export interface AnimeBySlugResponse {
  success: boolean;
  data:    Data;
}

export interface Data {
  title:               string;
  slug:                string;
  alternative_titles:  string[];
  status:              string;
  rating:              number;
  type:                string;
  cover:               string;
  synopsis:            string;
  genres:              string[];
  year:                number;
  start_date:          Date;
  end_date:            null;
  malId:               null;
  mature:              boolean;
  votes:               number;
  next_airing_episode: null;
  episodes:            Episode[];
  url:                 string;
  related:             any[];
}

export interface Episode {
  number: number;
  slug:   string;
  url:    string;
}
