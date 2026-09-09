import { Component } from '@angular/core';

import { AnimeList } from '@shared/components/anime-list/anime-list';
import { EpisodeList } from '@shared/components/episode-list/episode-list';
import { OnAirList } from '@shared/components/on-air-list/on-air-list';

@Component({
  selector: 'app-home',
  imports: [OnAirList, EpisodeList, AnimeList],
  templateUrl: './home.html',
})
export class Home {}
