import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinationService, Destination } from '../../services/destination.service';
import { SeoService } from '../../services/seo.service';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-destination-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- SKELETON LOADING STATE -->
    <div *ngIf="isLoading" class="min-h-screen bg-slate-50">
      <!-- Skeleton Hero -->
      <div class="relative h-[50vh] min-h-[400px] w-full bg-slate-200 overflow-hidden animate-pulse">
        <div class="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div class="max-w-7xl mx-auto">
            <div class="h-16 w-80 bg-slate-300 rounded-xl mb-4"></div>
            <div class="h-6 w-48 bg-slate-300 rounded-lg"></div>
          </div>
        </div>
      </div>
      <!-- Skeleton Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <div class="h-8 w-48 bg-slate-200 rounded-lg mb-8 animate-pulse"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let i of [1,2,3,4,5,6]" class="h-56 bg-slate-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
          <div>
            <div class="h-80 bg-slate-200 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- LOADED STATE -->
    <div class="bg-slate-50 relative pb-6" *ngIf="!isLoading && destination">

      <!-- HERO SECTION -->
      <div class="relative h-[50vh] min-h-[400px] w-full bg-slate-900 overflow-hidden">
        <img [src]="destination.image" [alt]="destination.name" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" [ngClass]="imageLoaded ? 'opacity-100' : 'opacity-0'" (load)="imageLoaded = true">

        <div class="absolute inset-0 bg-black/40"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        <div class="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div class="max-w-7xl mx-auto">
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  [ngClass]="destination.type === 'Domestic' ? 'bg-sky-500/90 text-white' : 'bg-amber-500/90 text-white'">
              {{destination.type}} · {{destination.region}}
            </span>
            <h1 class="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight animate-heading">Discover {{destination.name}}</h1>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <!-- LEFT CONTENT -->
          <div class="lg:col-span-2">

            <!-- PLACES -->
            <div class="mb-16">
               <h2 class="text-3xl font-bold text-slate-800 mb-8 border-b-4 border-sky-500 inline-block pb-2">Places to Visit in {{destination.name}}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <a *ngFor="let place of destination.places; let i = index"
                      [routerLink]="['/destination', destination.type.toLowerCase(), destination.id, place.name.toLowerCase()]"
                      class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-heading flex flex-col"
                      [style.animation-delay]="(i * 0.08) + 's'">
                    <div class="relative h-48 overflow-hidden">
                      <img [src]="place.image" [alt]="place.name + ' - ' + destination.name + ' tourism'" 
                           loading="lazy"
                           class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <h3 class="absolute bottom-4 left-5 text-xl font-bold text-white drop-shadow-md z-10">{{place.name}}</h3>
                    </div>
                    <!-- View Details Badge -->
                    <div class="p-3 bg-sky-50 flex items-center justify-between group-hover:bg-sky-500 transition-colors">
                      <span class="text-[10px] font-black uppercase tracking-widest text-sky-600 group-hover:text-white">View Highlights</span>
                      <svg class="w-4 h-4 text-sky-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </a>
                </div>
            </div>

            <!-- TABS -->
            <div class="flex border-b border-slate-300 mb-8 space-x-10 overflow-x-auto">
              <button
                (click)="activeTab = 'includes'"
                [ngClass]="activeTab === 'includes' ? 'border-sky-500 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'"
                class="pb-4 text-xl font-bold border-b-4 transition-colors whitespace-nowrap">
                Includes / Excludes
              </button>
              <button
                (click)="activeTab = 'policies'"
                [ngClass]="activeTab === 'policies' ? 'border-sky-500 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'"
                class="pb-4 text-xl font-bold border-b-4 transition-colors whitespace-nowrap">
                Policies
              </button>
            </div>

            <!-- INCLUDES / EXCLUDES -->
            <div *ngIf="activeTab === 'includes'" class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 animate-heading">
              <div>
                <h3 class="text-2xl font-bold text-sky-700 mb-8">What's Included</h3>
                <ul class="space-y-4">
                  <li *ngFor="let item of includes" class="flex items-start text-slate-700 font-medium">
                     <svg class="w-6 h-6 text-sky-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                     <span>{{item}}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-slate-800 mb-8">What's Excluded</h3>
                <ul class="space-y-4">
                  <li *ngFor="let item of excludes" class="flex items-start text-slate-600 font-medium">
                     <svg class="w-6 h-6 text-red-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                     <span>{{item}}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- POLICIES -->
            <div *ngIf="activeTab === 'policies'" class="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 space-y-10 animate-heading">
               <div>
                 <h3 class="text-2xl font-bold text-slate-800 mb-4">Reservation Policy</h3>
                 <ul class="list-disc pl-5 text-slate-700 font-medium space-y-2">
                   <li>50% advance payment required for booking.</li>
                   <li>Remaining payment must be completed before the trip.</li>
                   <li>Hotels are strictly subject to availability.</li>
                 </ul>
               </div>
               <div class="border-t border-slate-100 pt-8">
                 <h3 class="text-2xl font-bold text-slate-800 mb-4">Cancellation Policy</h3>
                 <ul class="list-disc pl-5 text-slate-700 font-medium space-y-2">
                   <li>₹500 minimum cancellation charge.</li>
                   <li>25% charge if cancelled within 10 days of departure.</li>
                   <li>50% charge if cancelled within 9 days of departure.</li>
                   <li>100% charge if cancelled within 3 days of departure.</li>
                   <li>Cancellation must be officially informed via mail.</li>
                 </ul>
               </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: STICKY WIDGET -->
          <div class="lg:col-span-1">
            <div class="sticky top-32 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center mt-12 lg:mt-0">

               <div class="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-6 shadow-inner">
                 <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
               </div>

               <h3 class="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Book This Tour</h3>
               <p class="text-slate-500 font-medium mb-8 leading-relaxed">
                 Contact our travel experts on WhatsApp for a custom quote.
               </p>

               <a [href]="'https://wa.me/' + APP_CONFIG.whatsapp + '?text=Hi! I am interested in the ' + destination.name + ' tour.'" target="_blank"
                  class="w-full bg-sky-500 text-white py-4 rounded-xl font-bold text-xl hover:bg-sky-600 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-sky-500/40 text-center block">
                  Book Now
               </a>

               <div class="mt-6 flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Secure Contact
               </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- NOT FOUND STATE -->
    <div *ngIf="!isLoading && !destination" class="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
      <div class="text-center animate-heading">
        <div class="text-8xl mb-6">🗺️</div>
        <h2 class="text-4xl font-bold text-slate-800 mb-4">Destination Not Found</h2>
        <p class="text-slate-500 mb-8 text-lg">We couldn't find the destination you're looking for.</p>
        <a routerLink="/explore" class="inline-block bg-sky-500 text-white px-8 py-3 rounded-full font-bold hover:bg-sky-600 transition-all shadow-lg">
          Browse All Destinations
        </a>
      </div>
    </div>
  `
})
export class DestinationDetailComponent implements OnInit {
  destination: Destination | null = null;
  isLoading = true;
  imageLoaded = false;
  activeTab: 'includes' | 'policies' = 'includes';
  APP_CONFIG = APP_CONFIG;

  includes = [
    'Transport arrangements (Non-AC vehicle)',
    'Accommodation (3 sharing basis)',
    'Sightseeing entry tickets',
    'Food & refreshments',
    'Campfire / activity experiences',
    'All taxes and service charges',
    'Driver allowance, fuel, toll & parking'
  ];

  excludes = [
    'Personal expenses',
    'Laundry and tips',
    'Optional tours',
    'Any activity not listed in inclusions',
    'Natural disturbances'
  ];

  constructor(
    private route: ActivatedRoute,
    private destService: DestinationService,
    private seoService: SeoService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('name');
      this.isLoading = true;
      this.imageLoaded = false;
      this.activeTab = 'includes';
      window.scrollTo(0, 0);

      if (id) {
        this.ngZone.run(async () => {
          try {
            // Add a timeout to prevent infinite loading
            const timeout = new Promise<null>(resolve => setTimeout(() => resolve(null), 10000));
            const fetchTask = this.destService.getDestinationById(id);

            this.destination = await Promise.race([fetchTask, timeout]);
            
            if (this.destination) {
              this.updateSeoMetadata(this.destination);
            }
          } catch (error) {
            console.error('Error loading destination:', error);
            this.destination = null;
          } finally {
            this.isLoading = false;
            this.cdr.detectChanges(); // Force UI update
            
            // Refresh ScrollTrigger if GSAP is loaded
            setTimeout(() => {
              if (typeof (window as any).gsap !== 'undefined') {
                (window as any).gsap.registerPlugin((window as any).ScrollTrigger);
                (window as any).ScrollTrigger.refresh();
              }
            }, 100);
          }
        });
      } else {
        this.destination = null;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateSeoMetadata(destination: Destination) {
    const placesList = destination.places.map(p => p.name).join(', ');
    const description = `Explore ${destination.name} tours. Visit ${placesList} and more. Premium travel packages for ${destination.region}. Book your ${destination.name} trip with Unique Tours & Travels.`;
    
    this.seoService.updateMetadata({
      title: `${destination.name} Tour Packages`,
      description: description,
      image: destination.image,
      url: `/destination/${destination.id}`,
      type: 'article',
      keywords: `${destination.name} tour, ${destination.name} packages, ${destination.region} tourism, visit ${destination.name}`
    });

    // Structured Data (JSON-LD)
    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": destination.name,
      "description": description,
      "image": destination.image,
      "touristType": destination.type,
      "containsPlace": destination.places.map(p => ({
        "@type": "Place",
        "name": p.name,
        "image": p.image
      }))
    });
  }
}
