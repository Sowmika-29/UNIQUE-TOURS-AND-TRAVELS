import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DestinationService, Destination } from '../../services/destination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-sky-200 via-white to-sky-200 pt-28 pb-20 relative overflow-hidden">
      
      <!-- Animated Background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="explore-orb eo-1"></div>
        <div class="explore-orb eo-2"></div>
        <div class="explore-shape es-1"></div>
        <div class="explore-shape es-2"></div>
        <div class="explore-dot ed-1"></div>
        <div class="explore-dot ed-2"></div>
        <div class="explore-dot ed-3"></div>
      </div>

      <!-- Header -->
      <div class="relative bg-slate-900 overflow-hidden mb-16 pt-24 pb-24">
        <div class="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover opacity-20" alt="World Map">
        </div>
        <!-- Header particles -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
          <div class="header-particle hp-1"></div>
          <div class="header-particle hp-2"></div>
          <div class="header-particle hp-3"></div>
          <div class="header-particle hp-4"></div>
          <div class="header-particle hp-5"></div>
        </div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-heading">
          <h1 class="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wider">{{title}}</h1>
          <p class="text-lg text-slate-300 max-w-2xl mx-auto">Find the perfect escape for your next adventure in our handpicked locations.</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Dynamic Grid -->
        <div *ngIf="isLoading" class="flex justify-center p-20">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
        </div>
        
        <div *ngIf="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <a *ngFor="let dest of filteredDestinations" 
             [routerLink]="['/destination', dest.id]"
             class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col relative h-80">
            
            <img [src]="dest.image" [alt]="dest.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              
            <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg text-xs font-bold tracking-wider uppercase"
                 [ngClass]="dest.type === 'Domestic' ? 'text-sky-500' : 'text-slate-800'">
              {{dest.type}}
            </div>

            <div class="relative z-10 mt-auto p-6 text-white w-full">
              <h3 class="text-3xl font-bold mb-1 group-hover:text-sky-400 transition-colors drop-shadow-md">{{dest.name}}</h3>
              <div class="flex items-center text-sm font-semibold opacity-90 group-hover:opacity-100 transition-opacity">
                <svg class="w-5 h-5 mr-1.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {{dest.places.length}} Places
              </div>
            </div>

          </a>
        </div>
        
        <div *ngIf="!isLoading && filteredDestinations.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
          <p class="text-2xl text-slate-500 font-medium">No destinations found in this category.</p>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .explore-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
    }
    .eo-1 {
      width: 350px; height: 350px;
      background: rgba(56, 189, 248, 0.25);
      top: 20%; right: -80px;
      animation: orb-drift 18s ease-in-out infinite;
    }
    .eo-2 {
      width: 280px; height: 280px;
      background: rgba(14, 165, 233, 0.2);
      bottom: 10%; left: -60px;
      animation: orb-drift 22s ease-in-out infinite 5s;
    }
    .explore-shape {
      position: absolute;
      border: 3px solid rgba(56, 189, 248, 0.35);
      border-radius: 8px;
      animation: shape-3d linear infinite;
    }
    .es-1 { width: 40px; height: 40px; top: 30%; left: 5%; animation-duration: 12s; }
    .es-2 { width: 30px; height: 30px; bottom: 25%; right: 4%; animation-duration: 16s; animation-direction: reverse; }

    .explore-dot {
      position: absolute;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.4);
      bottom: 0;
      animation: dot-up linear infinite;
    }
    .ed-1 { width: 10px; height: 10px; left: 15%; animation-duration: 9s; }
    .ed-2 { width: 12px; height: 12px; left: 50%; animation-duration: 11s; animation-delay: 3s; }
    .ed-3 { width: 8px;  height: 8px;  left: 80%; animation-duration: 8s;  animation-delay: 5s; }

    .header-particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      bottom: 0;
      animation: dot-up linear infinite;
      box-shadow: 0 0 6px rgba(255,255,255,0.2);
    }
    .hp-1 { width: 8px;  height: 8px;  left: 10%; animation-duration: 8s; }
    .hp-2 { width: 10px; height: 10px; left: 30%; animation-duration: 12s; animation-delay: 2s; }
    .hp-3 { width: 6px;  height: 6px;  left: 55%; animation-duration: 10s; animation-delay: 4s; }
    .hp-4 { width: 12px; height: 12px; left: 75%; animation-duration: 14s; animation-delay: 1s; }
    .hp-5 { width: 8px;  height: 8px;  left: 90%; animation-duration: 9s;  animation-delay: 3s; }

    @keyframes orb-drift {
      0%, 100% { transform: translate(0,0) scale(1); }
      33% { transform: translate(40px,-30px) scale(1.1); }
      66% { transform: translate(-25px,35px) scale(0.95); }
    }
    @keyframes shape-3d {
      0%   { transform: perspective(300px) rotateX(0deg) rotateY(0deg); }
      100% { transform: perspective(300px) rotateX(360deg) rotateY(360deg); }
    }
    @keyframes dot-up {
      0%   { transform: translateY(0); opacity: 0; }
      10%  { opacity: 0.8; }
      85%  { opacity: 0.3; }
      100% { transform: translateY(-800px); opacity: 0; }
    }
  `]
})
export class ExploreComponent implements OnInit, OnDestroy {
  activeFilter: 'all' | 'domestic' | 'international' = 'all';
  allDestinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  isLoading = true;
  title = 'Explore All';

  private routerSub: Subscription | null = null;

  constructor(
    private router: Router,
    private destService: DestinationService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.updateFilter(this.router.url);
    
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateFilter(event.urlAfterRedirects);
    });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  async fetchData() {
    this.isLoading = true;
    const [domestic, international] = await Promise.all([
      this.destService.getDomesticDestinations(),
      this.destService.getInternationalDestinations()
    ]);
    
    this.allDestinations = [...domestic, ...international];
    this.applyFilter();
    this.isLoading = false;
  }

  updateFilter(url: string) {
    if (url.includes('/domestic')) {
      this.activeFilter = 'domestic';
      this.title = 'Domestic Destinations';
    } else if (url.includes('/international')) {
      this.activeFilter = 'international';
      this.title = 'International Destinations';
    } else {
      this.activeFilter = 'all';
      this.title = 'Explore All Destinations';
    }
    if (this.allDestinations.length > 0) {
      this.applyFilter();
    }
  }

  applyFilter() {
    if (this.activeFilter === 'all') {
      this.filteredDestinations = this.allDestinations;
    } else {
      this.filteredDestinations = this.allDestinations.filter(
        d => d.type.toLowerCase() === this.activeFilter
      );
    }
  }
}
