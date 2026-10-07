export interface MediaCatalogResp {
  success: boolean;
  data: MediaCatalogData;
}

export interface MediaCatalogData {
  currentPage: number;
  hasNextPage: boolean;
  previousPage: string | null;
  nextPage: string | null;
  foundPages: number;
  media: MediaItem[];
}

export interface MediaItem {
  title: string;
  cover: string;
  synopsis: string;
  slug: string;
  type: string;
  url: string;
}
