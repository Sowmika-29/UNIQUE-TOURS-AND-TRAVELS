import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Unique Tours & Travels'
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'explore',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'All Destinations - Unique Tours & Travels'
  },
  {
    path: 'explore/domestic',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'Domestic Tours - Unique Tours & Travels'
  },
  {
    path: 'explore/international',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'International Tours - Unique Tours & Travels'
  },
  {
    path: 'destination/:name',
    loadComponent: () => import('./pages/destination-detail/destination-detail.component').then(m => m.DestinationDetailComponent),
    title: 'Destination Details - Unique Tours & Travels'
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent),
    title: 'Travel Blog - Unique Tours & Travels'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us - Unique Tours & Travels'
  },
  { path: '**', redirectTo: '' }
];
