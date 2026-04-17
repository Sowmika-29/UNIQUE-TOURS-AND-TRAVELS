import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
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
    <div class="min-h-screen bg-slate-50 pt-16 md:pt-20 pb-4 relative overflow-hidden">
      
      <!-- Animated Background Decorations -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="explore-orb eo-1"></div>
        <div class="explore-orb eo-2"></div>
      </div>

      <!-- Header Section - Optimized Height -->
      <div class="relative bg-slate-900 overflow-hidden mb-6 md:mb-10 pt-12 pb-12 md:pt-16 md:pb-16 rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl">
        <div class="absolute inset-0 z-0">
           <img [src]="headerBackgroundImage" 
                class="w-full h-full object-cover opacity-50 transition-all duration-1000 scale-105" 
                [alt]="pageHeaderTitle">
           <div class="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
        </div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
          <h1 class="sr-only">{{pageHeaderTitle}}</h1>
          <h2 class="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-lg">{{pageHeaderTitle}}</h2>
          <p class="text-brand-light text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Premium Travel Collection</p>
        </div>
      </div>

      <!-- Enhanced Filter & Search Bar Section -->
      <div id="filter-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10 relative z-30">
        
        <!-- Background Glow Orbs for Filter Bar (Custom Non Photo Blue: #a4dded) -->
        <div class="absolute -inset-10 pointer-events-none overflow-hidden blur-3xl opacity-30">
          <div class="absolute top-1/2 left-1/4 w-64 h-32 bg-[#a4dded] rounded-full animate-mesh-orb-1"></div>
          <div class="absolute top-1/2 right-1/4 w-64 h-32 bg-[#7fd1e8] rounded-full animate-mesh-orb-2"></div>
        </div>

        <div class="relative bg-white/80 backdrop-blur-2xl p-5 md:p-7 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-6 items-center justify-between filter-bar-glass transition-all duration-500 hover:shadow-brand/20">
          
          <!-- Category Toggles with Glass Effect -->
          <div class="flex p-1.5 bg-slate-50/50 backdrop-blur-md rounded-2xl w-full md:w-auto border-2 border-[#87cefa]">
            <button *ngFor="let option of filterOptions"
                    (click)="setFilter(option.id)"
                    [ngClass]="activeFilter === option.id ? 'bg-brand text-slate-900 shadow-xl shadow-brand/20 scale-105' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'"
                    class="flex-1 md:flex-none px-7 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500">
              {{option.label}}
            </button>
          </div>

          <!-- Clean Search Bar with Interior Glow -->
          <div class="relative w-full md:w-[450px] group">
            <input type="text" 
                   [(ngModel)]="searchQuery" 
                   (input)="applyFilter()"
                   placeholder="Discover your next adventure..." 
                   class="w-full bg-slate-50/50 backdrop-blur-sm border-2 border-[#87cefa] rounded-[1.5rem] px-14 py-4 text-slate-700 font-bold focus:bg-white focus:border-sky-500 focus:shadow-inner-lg transition-all placeholder:text-slate-300">
            <div class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <div *ngIf="searchQuery" (click)="searchQuery=''; applyFilter()" class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-rose-500 cursor-pointer transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
          </div>

        </div>
      </div>

      <div id="results-target" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[400px] mb-20">
        
        <!-- Skeleton Loader -->
        <div *ngIf="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="h-[320px] md:h-[350px] bg-white rounded-3xl animate-pulse flex flex-col p-6 shadow-sm">
            <div class="mt-auto">
              <div class="h-8 bg-slate-100 rounded-lg w-3/4 mb-3"></div>
              <div class="h-4 bg-slate-50 rounded-lg w-1/2 mb-4"></div>
              <div class="h-8 bg-slate-50 rounded-xl w-1/3"></div>
            </div>
          </div>
        </div>

        <!-- Results Grid -->
        <div *ngIf="!isLoading && filteredDestinations.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <a *ngFor="let dest of filteredDestinations; let i = index; trackBy: trackByDestId" 
             [routerLink]="['/destination', dest.type.toLowerCase(), dest.id]"
             class="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col relative h-[320px] md:h-[350px] opacity-0 animate-fade-in-up">
            
            <!-- Compact Image View -->
            <div class="absolute inset-0 w-full h-full overflow-hidden">
              <img [src]="dest.image" [alt]="dest.name + ' - Unique Tours & Travels'" 
                   [loading]="i < 3 ? 'eager' : 'lazy'"
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
              <h3 class="text-2xl md:text-3xl font-bold mb-1 !text-white tracking-wide transition-all duration-300 group-hover:text-brand-light group-hover:scale-105 origin-center drop-shadow-2xl leading-none text-left">{{dest.name}}</h3>
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
             class="text-center py-20 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 animate-fade-in mx-auto max-w-4xl shadow-sm">
           <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </div>
          <h4 class="text-xl md:text-2xl text-slate-900 font-black mb-2 tracking-tighter">No Destinations Matched</h4>
          <p class="text-slate-400 text-sm font-medium mb-8">
            Try a different category or search term.
          </p>
          <button (click)="resetFilters()" 
                  class="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-sky-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
            Show all destinations
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
      background: rgba(0, 177, 234, 0.25);
      top: -100px; right: -100px;
    }
    .eo-2 {
      width: 300px; height: 300px;
      background: rgba(164, 221, 237, 0.2);
      bottom: 20%; left: -100px;
    }
    @keyframes mesh-orb-1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    @keyframes mesh-orb-2 {
      0%, 100% { transform: translate(0, 0) scale(1.1); }
      33% { transform: translate(-50px, 30px) scale(0.9); }
      66% { transform: translate(20px, -20px) scale(1.1); }
    }
    .animate-mesh-orb-1 { animation: mesh-orb-1 15s infinite ease-in-out; }
    .animate-mesh-orb-2 { animation: mesh-orb-2 18s infinite ease-in-out; }
    
    .filter-bar-glass {
      background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
    }

    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { 
      animation: fade-in-up 0.5s ease-out forwards; 
    }
    .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
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
    private seoService: SeoService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.fetchData();
    this.checkInitialFilter(this.router.url);
    
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.ngZone.run(() => {
        const prevFilter = this.activeFilter;
        this.checkInitialFilter(event.urlAfterRedirects);
        this.cdr.detectChanges();
        
        // Only scroll to top if completely navigating away or if filter changed and we want to show results
        if (prevFilter !== this.activeFilter) {
          // Scroll to the results target instead of absolute top to keep results in view
          const target = document.getElementById('results-target');
          if (target) {
            const offset = 160; // Offset for fixed navbar + filter area
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  async fetchData() {
    this.isLoading = true;
    try {
      const [domestic, international] = await Promise.all([
        this.destService.getDomesticDestinations(),
        this.destService.getInternationalDestinations()
      ]);
      
      this.allDestinations = [...(domestic || []), ...(international || [])];
      this.applyFilter();
    } catch (error) {
      console.error('Failed to fetch destinations', error);
    } finally {
      // Safety timeout to ensure skeletons disappear even if re-rendering is slow
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }, 300);
    }
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

  get headerBackgroundImage(): string {
    if (this.activeFilter === 'domestic') {
      // Stunning Indian Landscapes (Munnar Tea Gardens / Kerala Backwaters - Premium Cinematic)
      return "assets/images/domestic-hero-premium.png";
    }
    if (this.activeFilter === 'international') {
      // Iconic European/Global Vibes (Swiss Alps/Village)
      return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=webp&fit=crop&w=1920&q=50";
    }
    // High-impact Wanderlust/Adventure for All
    return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?fm=webp&fit=crop&w=1920&q=50";
  }

  setFilter(type: 'all' | 'domestic' | 'international') {
    const targetUrl = type === 'all' ? '/explore' : `/explore/${type}`;
    this.router.navigateByUrl(targetUrl);
  }

  applyFilter() {
    let filtered = this.allDestinations;

    // Type filter
    if (this.activeFilter !== 'all') {
      const filterValue = this.activeFilter.toLowerCase();
      filtered = filtered.filter(d => d.type?.toLowerCase() === filterValue);
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
    this.cdr.detectChanges();
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

  trackByDestId(index: number, item: Destination): string {
    return item.id;
  }
}
