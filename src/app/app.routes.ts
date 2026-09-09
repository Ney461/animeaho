import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { Layout } from './layout/layout/layout';

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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
