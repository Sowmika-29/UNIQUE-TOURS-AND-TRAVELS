import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';

import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white relative overflow-hidden">
      
      <!-- Animated Background elements -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div class="orb orb-blizzard-1"></div>
        <div class="orb orb-blizzard-2"></div>
      </div>
      <!-- HERO SECTION -->
      <div class="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img [src]="blog?.image" [alt]="blog?.title" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
        <div class="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
           <span class="text-sky-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Travel Perspective</span>
           <h1 class="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">{{blog?.title}}</h1>
           <div class="w-24 h-1.5 bg-sky-500 mx-auto rounded-full shadow-lg shadow-sky-500/50"></div>
        </div>
      </div>

      <!-- BLOG CONTENT -->
      <article class="max-w-4xl mx-auto px-6 py-20 animate-slide-up">
         <div class="prose prose-lg max-w-none text-slate-600 leading-relaxed font-medium">
            <p class="text-2xl text-slate-900 font-black mb-10 leading-tight italic border-l-8 border-sky-500 pl-8">
               "{{blog?.description}}"
            </p>
            
            <p class="mb-6">
               Traveling is about more than just seeing new places; it's about experiencing the world from a different perspective. In this article, we dive deep into the heart of travel, uncovering the secrets that turn a simple trip into a lifelong memory.
            </p>
            
            <h2 class="text-3xl font-black text-slate-900 mt-12 mb-6 uppercase tracking-tight">Making the Most of Your Journey</h2>
            <p class="mb-8">
               From the bustling streets of world-class cities to the quiet solitude of mountain peaks, every destination has a story to tell. Our expert team has spent years navigating these terrains to bring you the most authentic advice and hidden gems.
            </p>

            <div class="p-8 rounded-3xl border-2 border-transparent mb-12 shadow-xl bg-[#87ceeb]">
               <h3 class="text-xl font-black text-slate-950 mb-4">Why This Guide Matters</h3>
               <p class="text-sm text-slate-900 font-semibold leading-relaxed">
                  Whether you're a seasoned globetrotter or planning your very first escape, understanding the nuances of your chosen destination can make all the difference. We focus on sustainability, cultural respect, and maximizing every moment of your adventure.
               </p>
            </div>

            <p>
               Below, you'll find our hand-selected recommendations that align perfectly with the themes explored in this post. These destinations offer the exact atmosphere and experiences described above.
            </p>
         </div>
      </article>

      <!-- RELATED SUGGESTIONS (FROM EXISTING DATA) -->
      <section class="bg-slate-50 py-24 border-t border-slate-100">
         <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
               <div>
                  <span class="text-sky-600 font-black text-xs uppercase tracking-widest mb-2 block">Personalized Picks</span>
                  <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Related Destinations</h2>
                  <p class="text-slate-500 font-medium">Based on the categories found in this article.</p>
               </div>
            </div>

            <div *ngIf="relatedPlaces.length > 0; else loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div *ngFor="let dest of relatedPlaces; let i = index" 
                    class="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-[400px] animate-slide-up"
                    [style.animation-delay]="i * 100 + 'ms'">
                  
                  <div class="absolute inset-0">
                     <img [src]="dest.image" [alt]="dest.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                     <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
                  </div>

                  <div class="relative mt-auto p-8 z-10">
                     <div class="flex items-center gap-2 mb-3">
                        <span class="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black tracking-widest uppercase rounded-full">Recommended</span>
                        <span class="text-white/60 text-[10px] uppercase font-bold tracking-widest">{{dest.type}}</span>
                     </div>
                     <h3 class="text-3xl font-black text-white mb-3 group-hover:text-sky-400 transition-colors">{{dest.name}}</h3>
                     <p class="text-white/70 text-sm font-medium line-clamp-2 mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {{dest.description}}
                     </p>
                     
                     <div class="flex gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        <button (click)="exploreDestination(dest)" class="flex-1 py-3 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-sky-500 hover:text-white transition-all">Explore →</button>
                        <button (click)="enquire(dest.name)" class="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">
                           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.39l-.794 2.895 2.964-.778c.801.439 1.713.69 2.687.69.003 0 .006 0 .009 0 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.387 8.191c-.139.394-.803.743-1.129.771-.326.028-.654.159-2.071-.416-1.89-.769-3.08-2.693-3.174-2.822-.094-.129-.763-.915-.763-1.745 0-.83.435-1.236.589-1.406l.426-.446c.105-.107.279-.163.42-.163.141 0 .28.001.402.006.126.005.297-.047.464.351.168.398.573 1.396.623 1.496.05.1.084.217.017.35-.067.133-.1.217-.2.333-.1.117-.21.263-.3.351-.102.102-.208.213-.089.417.12.204.53.873 1.139 1.414.782.696 1.438.91 1.643 1.013.204.104.323.086.443-.053.12-.139.513-.598.651-.803.136-.205.275-.172.466-.102.19.07 1.21.571 1.417.674.207.104.345.154.394.239.049.085.049.492-.09.886z"/></svg>
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <ng-template #loading>
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div *ngFor="let i of [1,2,3]" class="h-[400px] bg-slate-200 rounded-[2.5rem] animate-pulse"></div>
               </div>
            </ng-template>
         </div>
      </section>
    </div>
  `,
  styles: [`
    .orb { position: absolute; border-radius: 50%; filter: blur(120px); z-index: 0; opacity: 0.3; }
    .orb-blizzard-1 { width: 700px; height: 700px; top: -100px; left: -100px; background: #ace5ee; animation: drift 30s infinite alternate; }
    .orb-blizzard-2 { width: 600px; height: 600px; bottom: 10%; right: -200px; background: #9bddff; animation: drift 25s infinite alternate-reverse; }

    @keyframes drift { 
      0% { transform: translate(0,0) scale(1); }
      100% { transform: translate(150px, 100px) scale(1.05); }
    }

    @keyframes fade-in { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
    .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog: any = null;
  relatedPlaces: any[] = [];

  // Local data replicated from BlogComponent for simple mock content
  private blogsList = [
    { title: 'Top 10 Travel Tips for First-Time Travelers', description: 'Essential tips to make your first journey smooth and enjoyable, from packing light to navigating new cultures. We cover everything from organizing your documents to staying safe in unfamiliar environments.', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?fm=webp&fit=crop&w=1200&q=50' },
    { title: 'Best Beach Destinations to Relax', description: 'Discover peaceful beach locations for a perfect vacation. Crystal clear waters and golden sands await in these hidden tropical paradises.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=webp&fit=crop&w=1200&q=50' },
    { title: 'Hill Stations You Must Visit in India', description: 'Explore the most scenic hill stations across India, where misty peaks and tea gardens touch the sky. From charm of Shimla to the serene valleys of Coorg.', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?fm=webp&fit=crop&w=1200&q=50' },
    { title: 'How to Plan a Budget-Friendly Trip', description: 'Smart ways to travel without overspending. Learn to find the best deals and hidden gems on a budget.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?fm=webp&fit=crop&w=1200&q=50' },
    { title: 'Exploring the Hidden Gems of Southeast Asia', description: 'Beyond the crowded tourist trails lie mystical temples, emerald rice terraces, and untouched islands.', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?fm=webp&fit=crop&w=1200&q=50' },
    { title: 'The Ultimate Wildlife Safari Guide', description: 'Prepare for a thrilling adventure in the wild. From the vast plains of the Serengeti to the dense jungles of India.', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?fm=webp&fit=crop&w=1200&q=50' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destService: DestinationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      this.blog = this.blogsList.find(b => b.title === title);
      
      if (this.blog) {
        this.loadRelated();
      } else {
        this.router.navigate(['/blog']);
      }
    });
  }

  async loadRelated() {
    this.relatedPlaces = await this.destService.getRelatedPlaces(this.blog.title);
  }

  exploreDestination(dest: any) {
    // Standard routing logic reused
    this.router.navigate(['/destination', dest.type, dest.parent, dest.name.toLowerCase()]);
  }

  enquire(name: string) {
    const message = `Hi! I read your blog about "${this.blog?.title}" and I'm interested in ${name}. Can you share details?`;
    window.open(`https://wa.me/${APP_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  }
}
