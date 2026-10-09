export interface EpisodeDataResp {
  success: boolean;
  data:    Data;
}

export interface Data {
  title:     string;
  number:    number;
  embeds:    Download[];
  downloads: Download[];
}

export interface Download {
  name: string;
  url:  string;
  type: string;
}
