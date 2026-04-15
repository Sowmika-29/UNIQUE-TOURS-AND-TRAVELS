import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinationService, Place, SubPlace } from '../../services/destination.service';
import { SeoService } from '../../services/seo.service';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 relative overflow-hidden">
      
      <!-- Premium Animated Background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div class="orb orb-1 opacity-20"></div>
        <div class="orb orb-2 opacity-15"></div>
        <div class="floating-bubble bubble-1"></div>
        <div class="floating-bubble bubble-2"></div>
      </div>

      <!-- SKELETON LOADING -->
      <div *ngIf="isLoading" class="relative z-10 animate-pulse">
        <div class="h-[60vh] bg-slate-200 w-full"></div>
        <div class="max-w-7xl mx-auto px-4 py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let i of [1,2,3,4,5,6]" class="h-80 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>
      </div>

      <!-- LOADED CONTENT -->
      <div *ngIf="!isLoading && place" class="relative z-10">
        
        <!-- HERO SECTION -->
        <div class="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
          <img [src]="place.image" [alt]="place.name" class="absolute inset-0 w-full h-full object-cover">
          <!-- Premium Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30"></div>
          
          <div class="relative z-20 text-center px-4 animate-fade-slide">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span class="text-xs font-black uppercase tracking-[0.2em] text-white/90">Curated Destination</span>
            </div>
            <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
              {{place.name}}
            </h1>
            <p class="text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              {{place.description}}
            </p>
          </div>

          <!-- Bottom Curve -->
          <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg class="relative block w-full h-16 fill-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,115.15,135.53,114,200.44,101.55S276.53,74.74,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        <!-- SUB-PLACES GRID -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-slide-up">
            <div>
              <h2 class="text-4xl font-black text-slate-800 tracking-tight mb-2">Must Visit Places</h2>
              <p class="text-slate-500 font-medium">Handpicked spots in {{place.name}} for an unforgettable experience.</p>
            </div>
            <div class="h-1 w-24 bg-sky-500 rounded-full hidden md:block"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let sub of place.subPlaces; let i = index" 
                 class="group premium-card animate-stagger"
                 [style.animation-delay]="(i * 0.1) + 's'">
              
              <div class="relative h-64 overflow-hidden rounded-t-2xl">
                <img [src]="sub.image" [alt]="sub.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black tracking-widest text-sky-600 uppercase">
                    Featured Spot
                  </span>
                </div>
              </div>

              <div class="p-6 bg-white rounded-b-2xl border-x border-b border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-sky-100 group-hover:-translate-y-2">
                <div class="flex items-center gap-2 text-sky-500 mb-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  <span class="text-xs font-bold tracking-wide">{{sub.location}}</span>
                </div>
                <h3 class="text-2xl font-black text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">{{sub.name}}</h3>
                <p class="text-slate-500 text-sm leading-relaxed mb-6">
                  {{sub.description}}
                </p>
                
                <button (click)="openBooking(sub.name)" class="w-full py-3 bg-sky-50 text-sky-600 font-black rounded-xl text-xs tracking-widest hover:bg-sky-500 hover:text-white transition-all">
                  ENQUIRE ABOUT THIS SPOT
                </button>
              </div>
            </div>
          </div>

        </section>

      </div>

      <!-- ERROR STATE -->
      <div *ngIf="!isLoading && !place" class="min-h-screen flex items-center justify-center p-4">
        <div class="text-center">
          <div class="text-9xl mb-8">🔍</div>
          <h2 class="text-4xl font-black text-slate-800 mb-4">Place Details Not Found</h2>
          <p class="text-slate-500 mb-10">The destination details aren't ready yet. Check back soon!</p>
          <a routerLink="/explore" class="px-10 py-4 bg-sky-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl">
            Back to Explore
          </a>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .orb { position: absolute; border-radius: 50%; filter: blur(100px); background: #9bddff; z-index: 0; }
    .orb-1 { width: 500px; height: 500px; top: -200px; left: -200px; animation: drift 25s infinite alternate; }
    .orb-2 { width: 400px; height: 400px; bottom: 10%; right: -100px; animation: drift 20s infinite alternate-reverse; }

    .floating-bubble { position: absolute; border: 2px solid rgba(155, 221, 255, 0.4); border-radius: 50%; animation: float 12s infinite ease-in-out; z-index: 0; }
    .bubble-1 { width: 120px; height: 120px; top: 30%; right: 10%; }
    .bubble-2 { width: 80px; height: 80px; bottom: 20%; left: 15%; }

    @keyframes drift { 
      0% { transform: translate(0,0); }
      100% { transform: translate(150px, 100px); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-30px) rotate(15deg); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-slide { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-slide-up { animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    .animate-stagger { 
      opacity: 0;
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
    }
  `]
})
export class PlaceDetailComponent implements OnInit {
  place: Place | null = null;
  isLoading = true;
  category: string = '';
  destinationId: string = '';
  placeName: string = '';

  constructor(
    private route: ActivatedRoute,
    private destService: DestinationService,
    private seoService: SeoService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.destinationId = params.get('place') || ''; // The ID of the state/destination
      this.placeName = params.get('subplace') || '';

      if (this.category && this.destinationId && this.placeName) {
        this.loadPlaceDetails();
      } else {
        this.isLoading = false;
      }
    });
  }

  async loadPlaceDetails() {
    this.isLoading = true;
    window.scrollTo(0, 0);
    
    try {
      this.place = await this.destService.getSubPlace(this.category, this.destinationId, this.placeName);
      if (this.place) {
        this.updateSeo(this.place);
      }
    } catch (e) {
      console.error('Error loading place details:', e);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  updateSeo(place: Place) {
    this.seoService.updateMetadata({
      title: `${place.name} - Unique Tours & Travels`,
      description: `Plan your trip to ${place.name}. ${place.description}`,
      image: place.image,
      url: `/destination/${this.category}/${this.destinationId}/${this.placeName.toLowerCase()}`
    });
  }

  openBooking(subName: string) {
    const message = `Hi! I'm interested in visiting ${subName} in ${this.place?.name}. Can you provide tour details?`;
    window.open(`https://wa.me/${APP_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  }
}
