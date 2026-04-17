import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-service-destinations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- HERO BANNER -->
      <div class="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
          <img [src]="activeService?.image" [alt]="activeService?.title" class="w-full h-full object-cover animate-slow-zoom">
          <div class="absolute inset-0 bg-sky-900/40 backdrop-blur-[2px]"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 text-center px-4 animate-fade-in">
          <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
           <span class="text-slate-900 ml-3">{{ activeService?.accent }}</span>
          </h1>
          <p class="text-slate-700 text-sm md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-[0.2em]">
            {{ activeService?.subtitle }}
          </p>
        </div>
      </div>

      <!-- DESTINATIONS GRID -->
      <div class="max-w-7xl mx-auto px-6 py-10 md:py-20">
        <!-- Loading State -->
        <div *ngIf="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
           <div *ngFor="let i of [1,2,3]" class="bg-slate-50 rounded-3xl h-[350px] animate-pulse"></div>
        </div>

        <div *ngIf="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div *ngFor="let dest of activeService?.destinations" 
               (click)="exploreDestination(dest)"
               class="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-sky-200/50 flex flex-col h-[300px] md:h-[350px] cursor-pointer">
            
            <!-- Reused Image from Existing Data -->
            <div class="absolute inset-0">
              <img [src]="dest.image.startsWith('/') ? dest.image : '/' + dest.image" [alt]="dest.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 decoration-overlay"></div>
            </div>

            <!-- Card Content Overlay -->
            <div class="relative mt-auto p-6 z-10 bg-gradient-to-t from-slate-900 to-transparent">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                {{ dest.name }}
              </h3>
              
              <div class="flex flex-wrap gap-2">
                <button class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:border-sky-500 transition-all flex-1 whitespace-nowrap">
                  Explore →
                </button>
                <button (click)="$event.stopPropagation(); enquireOnWhatsapp(dest.name)" 
                        class="bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all flex-1 whitespace-nowrap">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slow-zoom {
      from { transform: scale(1); }
      to { transform: scale(1.1); }
    }
    .animate-slow-zoom {
      animation: slow-zoom 20s infinite alternate ease-in-out;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }
    .decoration-overlay {
      background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 40%, transparent 100%);
    }
  `]
})
export class ServiceDestinationsComponent implements OnInit {
  activeService: any = null;
  isLoading = true;

  // 1. NON-NEGOTIABLE RULE: Name Mappings Only
  private readonly serviceSuggestions: Record<string, string[]> = {
    'student-trips': ["Hampi", "Gokarna", "Old Manali", "Varkala", "Lonavala", "Jaipur"],
    'honeymoon-trips': ["Munnar", "Maldives", "Bali", "Gulmarg", "Havelock Island", "Palolem"],
    'family-trips': ["Alleppey", "Mysore", "Dubai", "Singapore", "Mahabaleshwar", "Delhi"],
    'college-tours': ["Baga Beach", "Rohtang Pass", "Coorg", "Dudhsagar", "Pattaya", "Kuta"],
    'farewell-trips': ["Calangute", "Solang Valley", "Seminyak", "Port Blair", "Pangong Lake", "Gokarna"],
    'corporate-trips': ["Dubai", "Singapore", "Kuala Lumpur", "Bangkok", "Colombo", "Bentota"],
    'adventure-trips': ["Ladakh", "Krabi", "Borneo", "Komodo Island", "Havelock Island", "Solang Valley"],
    'weekend-getaways': ["Lonavala", "Coorg", "Varkala", "Mahabaleshwar", "Mysore", "Gokarna"],
    'summer-packages': ["Manali", "Ladakh", "Gulmarg", "Pahalgam", "Munnar", "Nuwara Eliya"],
    'winter-packages': ["Goa", "Kerala", "Jaipur", "Maldives", "Dubai", "Lakshadweep"],
    'devotional-tours': ["Padmanabhaswamy Temple", "Udupi", "Nashik", "Kandy", "Borobudur", "Ayutthaya"],
    'customized-tours': ["Bali", "Sri Lanka", "Thailand", "Kerala", "Jammu & Kashmir", "Jaipur"]
  };

  private readonly headerMetadata: Record<string, any> = {
    'student-trips': { title: 'Student', accent: 'Trips', subtitle: 'Budget-friendly, Fun & Backpacking', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop' },
    'honeymoon-trips': { title: 'Honeymoon', accent: 'Trips', subtitle: 'Romantic & Private', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop' },
    'family-trips': { title: 'Family', accent: 'Trips', subtitle: 'Safe, Relaxing & Sightseeing', image: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=2070&auto=format&fit=crop' },
    'college-tours': { title: 'College', accent: 'Tours', subtitle: 'Group Activities & Thrills', image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop' },
    'farewell-trips': { title: 'Farewell', accent: 'Trips', subtitle: 'Memorable Final Getaways', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop' },
    'corporate-trips': { title: 'Corporate / Incentives', accent: 'Tours', subtitle: 'Luxury & Team Building', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
    'adventure-trips': { title: 'Adventure', accent: 'Trips', subtitle: 'Thrilling Experiences', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2070&auto=format&fit=crop' },
    'weekend-getaways': { title: 'Weekend', accent: 'Getaways', subtitle: 'Short & Sweet', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop' },
    'summer-packages': { title: 'Summer', accent: 'Packages', subtitle: 'Beat the Heat', image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop' },
    'winter-packages': { title: 'Winter', accent: 'Packages', subtitle: 'Sun & Sand', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop' },
    'devotional-tours': { title: 'Devotional', accent: 'Tours', subtitle: 'Spiritual & Temples', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070&auto=format&fit=crop' },
    'customized-tours': { title: 'Group / Customized', accent: 'Tours', subtitle: 'Flexible & Versatile', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2070&auto=format&fit=crop' }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destService: DestinationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.isLoading = true;
      const type = params.get('type') || 'student-trips';
      const meta = this.headerMetadata[type] || this.headerMetadata['student-trips'];

      this.activeService = {
        ...meta,
        destinations: []
      };

      const suggestionNames = this.serviceSuggestions[type] || [];
      const fetchedDestinations = [];

      for (const name of suggestionNames) {
        // Fetch full object hierarchy from existing data
        const match = await this.destService.findPlaceOrSubPlace(name);
        if (match) {
          // Normalize description and image for the card view
          fetchedDestinations.push({
            ...match,
            name: match.data.name,
            image: match.data.image,
            description: match.data.description || `Explore the beautiful landscapes of ${match.data.name}.`
          });
        }
      }

      this.activeService.destinations = fetchedDestinations;
      this.isLoading = false;
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }

  // Navigation Logic (Direct deep linking)
  exploreDestination(dest: any) {
    if (dest.subPlace) {
      // Direct Link to Sub-Place
      this.router.navigate(['/destination', dest.type, dest.parent, dest.place.toLowerCase(), dest.subPlace.toLowerCase()]);
    } else if (dest.place) {
      // Direct Link to Place
      this.router.navigate(['/destination', dest.type, dest.parent, dest.place.toLowerCase()]);
    } else {
      // Redirect to Category Level
      this.router.navigate(['/destination', dest.type, dest.parent]);
    }
  }

  enquireOnWhatsapp(destName: string) {
    const phoneNumber = "919000000000";
    const message = `Hello, I’m interested in ${destName} trip. Please share package details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  }
}
