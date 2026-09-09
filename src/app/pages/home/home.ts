import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { AnimeCard } from "../../shared/components/anime-card/anime-card";
import { EpisodeCard } from "../../shared/components/episode-card/episode-card";
import { OnAirList } from "../../shared/components/on-air-list/on-air-list";
import { EpisodeList } from "../../shared/components/episode-list/episode-list";
import { AnimeList } from "../../shared/components/anime-list/anime-list";

@Component({
  selector: 'app-home',
  imports: [OnAirList, EpisodeList, AnimeList],
  templateUrl: './home.html',
})
export class Home {}
