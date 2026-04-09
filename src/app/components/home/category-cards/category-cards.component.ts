import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-category-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden category-section">

      <!-- Premium Background Elements -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="orb orb-1 opacity-20"></div>
        <div class="orb orb-2 opacity-20"></div>
        <div class="floating-bubble bubble-1"></div>
        <div class="floating-bubble bubble-2"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="text-center mb-16 category-header opacity-0 translate-y-10">
          <span class="text-sky-500 font-black tracking-[0.3em] uppercase text-xs mb-3 block">
            Choose Your Destination
          </span>
          <h2 class="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4 italic">Where to Next?</h2>
          <div class="w-24 h-2 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <!-- Domestic Tours Card -->
          <a routerLink="/explore/domestic"
             class="group cat-card relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl hover:shadow-sky-500/20 transition-all duration-700 cursor-pointer flex items-end opacity-0 -translate-x-20">
            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80" 
                 alt="Domestic Tours" 
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110">
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div class="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>

            <div class="relative z-10 w-full p-12 transform transition-transform duration-700 group-hover:-translate-y-6">
               <div class="mb-4 overflow-hidden">
                  <span class="inline-block text-sky-400 font-black text-sm tracking-widest uppercase mb-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">Incredible India</span>
                  <h3 class="text-5xl md:text-6xl font-black text-white tracking-tighter">Domestic</h3>
               </div>
               <p class="text-gray-300 text-xl font-medium max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">Discover the hidden gems across the subcontinent.</p>
               
               <div class="mt-8 flex items-center gap-4 text-white font-bold group/btn">
                  <span class="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-sky-600 transition-all duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                  <span class="tracking-widest uppercase text-xs">Explore More</span>
               </div>
            </div>
          </a>

          <!-- International Tours Card -->
          <a routerLink="/explore/international"
             class="group cat-card relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl hover:shadow-indigo-500/20 transition-all duration-700 cursor-pointer flex items-end opacity-0 translate-x-20">
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80" 
                 alt="International Tours" 
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110">
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div class="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>

            <div class="relative z-10 w-full p-12 transform transition-transform duration-700 group-hover:-translate-y-6">
               <div class="mb-4 overflow-hidden">
                  <span class="inline-block text-indigo-400 font-black text-sm tracking-widest uppercase mb-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">Global Escapes</span>
                  <h3 class="text-5xl md:text-6xl font-black text-white tracking-tighter">International</h3>
               </div>
               <p class="text-gray-300 text-xl font-medium max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">Across oceans and continents, luxury awaits.</p>

               <div class="mt-8 flex items-center gap-4 text-white font-bold group/btn">
                  <span class="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-indigo-600 transition-all duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                  <span class="tracking-widest uppercase text-xs">Explore More</span>
               </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .orb { position: absolute; border-radius: 50%; filter: blur(100px); }
    .orb-1 { width: 400px; height: 400px; background: rgba(14, 165, 233, 0.2); top: -100px; left: -100px; }
    .orb-2 { width: 300px; height: 300px; background: rgba(99, 102, 241, 0.15); bottom: -50px; right: 10%; }

    .floating-bubble {
      position: absolute;
      width: 100px; height: 100px;
      border: 1px solid rgba(14, 165, 233, 0.2);
      border-radius: 30px;
    }
    .bubble-1 { top: 10%; right: 5%; }
    .bubble-2 { bottom: 15%; left: 5%; }
  `]
})
export class CategoryCardsComponent implements AfterViewInit {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    // Header Reveal
    gsap.to('.category-header', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.category-section',
        start: 'top 85%'
      }
    });

    // Cards Reveal
    gsap.to('.cat-card', {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.category-section',
        start: 'top 70%'
      }
    });

    // Bubbles Rotation
    gsap.to('.floating-bubble', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  }
}
