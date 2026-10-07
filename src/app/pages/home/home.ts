import { Component } from '@angular/core';

import { OnAirList } from '@pages/home/on-air-list/on-air-list';
import { EpisodeList } from '@shared/components/episode-list/episode-list';
import { AnimeList } from '@pages/home/anime-list/anime-list';

@Component({
  selector: 'app-home',
  imports: [OnAirList, EpisodeList, AnimeList],
  templateUrl: './home.html',
})
export class Home {}
