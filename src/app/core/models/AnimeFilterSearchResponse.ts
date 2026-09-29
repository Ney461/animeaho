import { Type } from "./HomeResponse";

export interface AnimeFilterSearchResponse {
  success: boolean;
  data:    Data;
}

export interface Data {
  currentPage:  number;
  hasNextPage:  boolean;
  previousPage: null;
  nextPage:     null;
  foundPages:   number;
  media:        Media[];
}

export interface Media {
  title:    string;
  cover:    string;
  synopsis: string;
  slug:     string;
  type:     Type;
  url:      string;
}
