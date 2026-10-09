import { Component, input } from '@angular/core';
import { AnimeEpisode } from '@core/models/AnimeDetailResp.interface';
import { EpisodeCard } from '@shared/components/episode-card/episode-card';
import { AddCoverEpisodePipe } from '../pipes/addCoverEpisode.pipe';

@Component({
  selector: 'episode-grid',
  imports: [EpisodeCard, AddCoverEpisodePipe],
  templateUrl: './episode-grid.html',
})
export class EpisodeGrid {
  episodes = input.required<AnimeEpisode[]>();
  animeCover = input.required<string>();
}
