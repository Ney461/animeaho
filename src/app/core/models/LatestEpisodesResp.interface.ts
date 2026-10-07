export interface LatestEpisodesResp {
  success: boolean;
  data:    LatestEpisodesItem[];
}

export interface LatestEpisodesItem {
  title:  string;
  number: number;
  cover:  string;
  slug:   string;
  url:    string;
}
