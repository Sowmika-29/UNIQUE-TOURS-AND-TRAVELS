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
      <div *ngIf="!isLoading && placeData" class="relative z-10">
        
        <!-- BREADCRUMBS -->
        <div class="absolute top-8 left-6 md:left-12 z-30 flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest animate-fade-in">
           <a routerLink="/" class="hover:text-white transition-colors">Home</a>
           <span class="opacity-40">/</span>
           <a [routerLink]="['/destination', type, parentId]" class="hover:text-white transition-colors capitalize">{{parentId}}</a>
           <span class="opacity-40">/</span>
           <a [routerLink]="['/destination', type, parentId, (placeName || '').toLowerCase()]" class="hover:text-white transition-colors capitalize">{{placeName}}</a>
           <ng-container *ngIf="subPlaceName">
             <span class="opacity-40">/</span>
             <span class="text-sky-400 font-black">{{subPlaceName}}</span>
           </ng-container>
        </div>

        <!-- HERO SECTION -->
        <div class="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
          <img [src]="placeData.image" [alt]="placeData.name" class="absolute inset-0 w-full h-full object-cover">
          <!-- Premium Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30"></div>
          
          <div class="relative z-20 text-center px-4 animate-fade-slide">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span class="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                {{ subPlaceName ? 'Direct Spot View' : 'Destination Overview' }}
              </span>
            </div>
            <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
              {{placeData.name}}
            </h1>
            <p class="text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              {{placeData.description}}
            </p>
            
            <div *ngIf="subPlaceName" class="mt-8">
               <button (click)="openBooking(placeData.name)" class="px-10 py-4 bg-sky-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl">
                 GET PACKAGE DETAILS
               </button>
            </div>
          </div>

          <!-- Bottom Curve -->
          <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg class="relative block w-full h-16 fill-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,115.15,135.53,114,200.44,101.55S276.53,74.74,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        <!-- SUB-PLACES GRID (Only show if viewing a Place, not a direct Sub-Place) -->
        <section *ngIf="!subPlaceName && placeData.subPlaces?.length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-slide-up">
            <div>
              <h2 class="text-4xl font-black text-slate-800 tracking-tight mb-2">Must Visit Places</h2>
              <p class="text-slate-500 font-medium">Handpicked spots in {{placeData.name}} for an unforgettable experience.</p>
            </div>
            <div class="h-1 w-24 bg-sky-500 rounded-full hidden md:block"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a *ngFor="let sub of placeData.subPlaces; let i = index" 
                 [routerLink]="['/destination', type, parentId, (placeName || '').toLowerCase(), sub.name.toLowerCase()]"
                 class="group premium-card animate-stagger flex flex-col no-underline"
                 [style.animation-delay]="(i * 0.1) + 's'">
              
              <div class="relative h-64 overflow-hidden rounded-t-2xl">
                <img [src]="sub.image" [alt]="sub.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black tracking-widest text-sky-600 uppercase">
                    Featured Spot
                  </span>
                </div>
              </div>

              <div class="p-6 bg-white rounded-b-2xl border-x border-b border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-sky-100 group-hover:-translate-y-2 flex-grow flex flex-col">
                <div class="flex items-center gap-2 text-sky-500 mb-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  <span class="text-xs font-bold tracking-wide">{{sub.location}}</span>
                </div>
                <h3 class="text-2xl font-black text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">{{sub.name}}</h3>
                <p class="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {{sub.description}}
                </p>
                
                <div class="w-full py-3 bg-sky-50 text-sky-600 font-black rounded-xl text-xs tracking-widest hover:bg-sky-500 hover:text-white transition-all text-center">
                  VIEW SPOT DETAILS
                </div>
              </div>
            </a>
          </div>

        </section>

        <!-- Optional: Specific Spot Details (If viewing a Sub-Place) -->
        <section *ngIf="subPlaceName" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-slide-up">
           <div class="bg-white rounded-3xl p-10 shadow-2xl border border-slate-100">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div>
                    <span class="text-sky-500 font-black text-xs uppercase tracking-widest mb-4 block">Spot Spotlight</span>
                    <h2 class="text-4xl font-black text-slate-900 mb-6 transition-all">Why Visit {{placeData.name}}?</h2>
                    <p class="text-slate-600 leading-relaxed text-lg mb-8">
                       {{placeData.description}} Discover the hidden gems and unique experiences that make this spot a highlight of {{placeName}}.
                    </p>
                    <div class="flex gap-4">
                       <div class="p-4 bg-slate-50 rounded-2xl flex-1">
                          <p class="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Location</p>
                          <p class="text-sm font-bold text-slate-700">{{placeData.location || placeName}}</p>
                       </div>
                       <div class="p-4 bg-slate-50 rounded-2xl flex-1">
                          <p class="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Experience Type</p>
                          <p class="text-sm font-bold text-slate-700">Sightseeing & Adventure</p>
                       </div>
                    </div>
                 </div>
                 <div class="rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
                    <img [src]="placeData.image" class="w-full h-full object-cover aspect-video" [alt]="placeData.name">
                 </div>
              </div>
           </div>
        </section>

      </div>

      <!-- ERROR STATE -->
      <div *ngIf="!isLoading && !placeData" class="min-h-screen flex items-center justify-center p-4">
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
  placeData: any = null;
  isLoading = true;
  
  type: string = '';
  parentId: string = '';
  placeName: string = '';
  subPlaceName: string = '';

  constructor(
    private route: ActivatedRoute,
    private destService: DestinationService,
    private seoService: SeoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') || '';
      this.parentId = params.get('parent') || '';
      this.placeName = params.get('place') || '';
      this.subPlaceName = params.get('subPlace') || '';

      this.loadDetails();
    });
  }

  async loadDetails() {
    this.isLoading = true;
    window.scrollTo(0, 0);
    
    try {
      // Find the most specific data available
      const searchName = this.subPlaceName || this.placeName;
      const result = await this.destService.findPlaceOrSubPlace(searchName);
      
      if (result) {
        this.placeData = result.data;
        this.updateSeo(result.data);
      }
    } catch (e) {
      console.error('Error loading place details:', e);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  updateSeo(data: any) {
    this.seoService.updateMetadata({
      title: `${data.name} - Unique Tours & Travels`,
      description: data.description,
      image: data.image,
      url: `/destination/${this.type}/${this.parentId}/${this.placeName}${this.subPlaceName ? '/' + this.subPlaceName : ''}`
    });
  }

  openBooking(name: string) {
    const message = `Hi! I'm interested in visiting ${name}. Can you provide tour details?`;
    window.open(`https://wa.me/${APP_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  }
}
