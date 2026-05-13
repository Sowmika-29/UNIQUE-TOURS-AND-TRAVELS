import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Explore Tour Packages India | Unique Tours & Travels'
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'explore',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'All Tour Packages | Unique Tours & Travels'
  },
  {
    path: 'explore/domestic',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'Domestic Tour Packages India | Unique Tours'
  },
  {
    path: 'explore/international',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent),
    title: 'International Tour Packages | Unique Tours'
  },
  {
    path: 'destination/:type/:id',
    loadComponent: () => import('./pages/destination-detail/destination-detail.component').then(m => m.DestinationDetailComponent),
    title: 'Destination Details | Unique Tours & Travels'
  },
  {
    path: 'destination/:type/:parent/:place',
    loadComponent: () => import('./pages/place-detail/place-detail.component').then(m => m.PlaceDetailComponent),
    title: 'Place Details | Unique Tours & Travels'
  },
  {
    path: 'destination/:type/:parent/:place/:subPlace',
    loadComponent: () => import('./pages/place-detail/place-detail.component').then(m => m.PlaceDetailComponent),
    title: 'Place Details | Unique Tours & Travels'
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent),
    title: 'Travel Tips & Blog | Unique Tours & Travels'
  },
  {
    path: 'blog/:title',
    loadComponent: () => import('./pages/blog/blog-detail.component').then(m => m.BlogDetailComponent),
    title: 'Blog Article | Unique Tours & Travels'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us | Unique Tours & Travels Karur'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent),
    title: 'Travel Services | Unique Tours & Travels'
  },
  {
    path: 'services/:type',
    loadComponent: () => import('./pages/services/service-destinations.component').then(m => m.ServiceDestinationsComponent),
    title: 'Service Packages | Unique Tours & Travels'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us | Unique Tours & Travels Karur'
  },
  { path: '**', redirectTo: '' }
];
