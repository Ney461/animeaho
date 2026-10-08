import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { Layout } from './layout/layout/layout';
import { AnimeDetail } from '@pages/anime-detail/anime-detail';
import { EpisodePlayer } from '@pages/episode-player/episode-player';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'catalog',
        component: Catalog
      },
      {
        path: 'anime/:slug',
        component: AnimeDetail
      },
      {
        path: 'episode/:slug/:number',
        component: EpisodePlayer
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
