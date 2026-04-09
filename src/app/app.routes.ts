import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Unique Tours and Travels'
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'explore',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'All Destinations - Unique Tours and Travels'
  },
  {
    path: 'explore/domestic',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'Domestic Tours - Unique Tours and Travels'
  },
  {
    path: 'explore/international',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'International Tours - Unique Tours and Travels'
  },
  {
    path: 'destination/:name',
    loadComponent: () => import('./pages/destination-detail/destination-detail.component').then(m => m.DestinationDetailComponent),
    title: 'Destination Details - Unique Tours and Travels'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us - Unique Tours and Travels'
  },
  { path: '**', redirectTo: '' }
];
