import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { DestinationService, Destination } from '../../services/destination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 pt-28 pb-20 relative overflow-hidden">
      
      <!-- Animated Background Decorations -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="explore-orb eo-1"></div>
        <div class="explore-orb eo-2"></div>
      </div>

      <!-- Header Section -->
      <div class="relative bg-slate-900 overflow-hidden mb-12 pt-24 pb-24 rounded-b-[3rem] shadow-2xl">
        <div class="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fm=webp&fit=crop&w=1920&q=50" 
                class="w-full h-full object-cover opacity-20 scale-110 blur-[2px]" alt="World Map">
           <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
        </div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="sr-only">Explore Domestic & International Destinations</h1>
          <h2 class="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">{{pageHeaderTitle}}</h2>
        </div>
      </div>

      <!-- New Filter & Search Bar -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-30">
        <div class="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          <!-- Category Toggles -->
          <div class="flex p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto">
            <button *ngFor="let option of filterOptions"
                    (click)="setFilter(option.id)"
                    [ngClass]="activeFilter === option.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : 'text-slate-500 hover:text-slate-800'"
                    class="flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300">
              {{option.label}}
            </button>
          </div>

          <!-- Clean Search Bar -->
          <div class="relative w-full md:w-96 group">
            <input type="text" 
                   [(ngModel)]="searchQuery" 
                   (input)="applyFilter()"
                   placeholder="Search destinations..." 
                   class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-3.5 text-slate-700 font-bold focus:bg-white focus:border-sky-500 transition-all placeholder:text-slate-300">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <div *ngIf="searchQuery" (click)="searchQuery=''; applyFilter()" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
          </div>

        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Results Grid -->
        <div *ngIf="!isLoading && filteredDestinations.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a *ngFor="let dest of filteredDestinations; let i = index" 
             [routerLink]="['/destination', dest.id]"
             class="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col relative h-[320px] animate-fade-up"
             [style.animation-delay]="(i % 8) * 50 + 'ms'">
            
            <!-- Compact Image View -->
            <div class="absolute inset-0 w-full h-full overflow-hidden">
              <img [src]="dest.image" [alt]="dest.name + ' - Unique Tours & Travels'" 
                   loading="lazy"
                   class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            </div>
              
            <!-- Interactive Badges -->
            <div class="absolute top-4 left-4 z-20">
              <div class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase text-white border border-white/20">
                {{dest.type}}
              </div>
            </div>

            <!-- Card Content Overlay -->
            <div class="relative z-10 mt-auto p-6 text-white w-full transform transition-all duration-500 group-hover:-translate-y-2">
              <h3 class="text-2xl font-black mb-1 !text-white !group-hover:text-sky-300 transition-colors tracking-tighter leading-none">{{dest.name}}</h3>
              <p class="text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-3">{{dest.region}}</p>
              
              <div class="flex items-center text-[11px] font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 w-fit">
                <svg class="w-3.5 h-3.5 mr-1.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                {{dest.places.length}} Highlights
              </div>
            </div>
          </a>
        </div>
        
        <!-- Modern Empty State -->
        <div *ngIf="!isLoading && filteredDestinations.length === 0" 
             class="text-center py-32 bg-white rounded-[3rem] border border-slate-100 animate-fade-in mx-auto max-w-4xl">
           <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
             <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </div>
          <h4 class="text-2xl text-slate-900 font-black mb-2 tracking-tighter">No Explorations Found</h4>
          <p class="text-slate-400 font-medium mb-8">
            Try broader keywords or change your category.
          </p>
          <button (click)="resetFilters()" 
                  class="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-sky-600 transition-all active:scale-95">
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .explore-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      z-index: 0;
    }
    .eo-1 {
      width: 400px; height: 400px;
      background: rgba(56, 189, 248, 0.1);
      top: -100px; right: -100px;
    }
    .eo-2 {
      width: 300px; height: 300px;
      background: rgba(14, 165, 233, 0.08);
      bottom: 20%; left: -100px;
    }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up { animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-fade-in { animation: fade-in 1s ease-out forwards; }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class ExploreComponent implements OnInit, OnDestroy {
  activeFilter: 'all' | 'domestic' | 'international' = 'all';
  searchQuery = '';
  allDestinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  isLoading = true;
  title = 'Explore All';

  filterOptions = [
    { id: 'all' as const, label: 'All' },
    { id: 'domestic' as const, label: 'Domestic' },
    { id: 'international' as const, label: 'International' }
  ];

  private routerSub: Subscription | null = null;

  constructor(
    private router: Router,
    private destService: DestinationService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.checkInitialFilter(this.router.url);
    
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkInitialFilter(event.urlAfterRedirects);
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

  checkInitialFilter(url: string) {
    if (url.includes('/domestic')) {
      this.activeFilter = 'domestic';
      this.title = 'Domestic Tours';
    } else if (url.includes('/international')) {
      this.activeFilter = 'international';
      this.title = 'International Tours';
    } else {
      this.activeFilter = 'all';
      this.title = 'Explore All Destinations';
    }
    if (this.allDestinations.length > 0) {
      this.applyFilter();
    }
  }

  get pageHeaderTitle(): string {
    if (this.activeFilter === 'domestic') return 'Domestic Tours';
    if (this.activeFilter === 'international') return 'International Tours';
    return 'Explore All Destinations';
  }

  setFilter(type: 'all' | 'domestic' | 'international') {
    const targetUrl = type === 'all' ? '/explore' : `/explore/${type}`;
    this.router.navigateByUrl(targetUrl);
  }

  applyFilter() {
    let filtered = this.allDestinations;

    // Type filter
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(d => d.type.toLowerCase() === this.activeFilter);
    }

    // Search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.region.toLowerCase().includes(q)
      );
    }

    this.filteredDestinations = filtered;
    this.updateSeo();
  }

  private updateSeo() {
    let seoTitle = 'Explore All Destinations';
    let seoDesc = 'Browse our complete collection of domestic and international tour packages. Find your next adventure with Unique Tours & Travels.';
    let seoUrl = '/explore';

    if (this.activeFilter === 'domestic') {
      seoTitle = 'Domestic Tour Packages';
      seoDesc = 'Explore the beauty of India with our premium domestic tour packages. From Kerala backwaters to Goa beaches, discover India like never before.';
      seoUrl = '/explore/domestic';
    } else if (this.activeFilter === 'international') {
      seoTitle = 'International Tour Packages';
      seoDesc = 'Discover world-class international destinations with our curated tour packages. Explore Dubai, Bali, Thailand, and more with Unique Tours & Travels.';
      seoUrl = '/explore/international';
    }

    this.seoService.updateMetadata({
      title: seoTitle,
      description: seoDesc,
      url: seoUrl,
      keywords: `tour packages, ${this.activeFilter} tours, travel destinations, Unique Tours & Travels`
    });
  }

  resetFilters() {
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.applyFilter();
  }
}
