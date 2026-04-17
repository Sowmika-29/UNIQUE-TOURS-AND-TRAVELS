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
    <section class="py-12 md:py-16 bg-gradient-to-b from-sky-50 via-sky-100 to-white relative overflow-hidden category-section">

      <!-- Premium Background Elements -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="orb orb-1 opacity-30"></div>
        <div class="orb orb-2 opacity-25"></div>
        <div class="orb orb-3 opacity-20"></div>
        
        <!-- Floating Particles -->
        <div class="particle p-1"></div>
        <div class="particle p-2"></div>
        <div class="particle p-3"></div>
        <div class="particle p-4"></div>
        <div class="particle p-5"></div>

        <div class="floating-bubble bubble-1"></div>
        <div class="floating-bubble bubble-2"></div>
      </div>

      <div class="max-w-[1100px] mx-auto px-4 relative z-10 w-full">
        
        <div class="text-center mb-10 category-header opacity-0 translate-y-10">
          <h2 class="text-3xl md:text-5xl font-black tracking-tighter italic">
            <span class="text-skyblue">Choose Your</span>
            <span class="text-dark"> Destination Style</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Domestic Tours Card -->
          <a routerLink="/explore/domestic"
             class="group cat-card relative aspect-square max-w-[500px] mx-auto w-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#a4dded]/40 hover:-translate-y-1.5 transition-all duration-700 cursor-pointer flex items-end opacity-0 -translate-x-20">
            <img src="/assets/images/DomesticCover.webp" 
                 alt="Domestic Tours - Premium Munnar Tea Gardens" 
                 loading="lazy"
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]">
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
            <div class="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition duration-700"></div>

            <div class="relative z-10 w-full p-6 transform transition-transform duration-700 group-hover:-translate-y-2">
               <div class="mb-2 overflow-visible">
                  <h3 class="text-2xl md:text-4xl font-bold !text-white tracking-wide transition-all duration-300 group-hover:text-sky-400 group-hover:scale-105 origin-center drop-shadow-xl">Domestic</h3>
               </div>
               <p class="text-gray-300 text-xs font-medium max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">Discover the hidden gems across the subcontinent.</p>
               
               <div class="mt-4 flex items-center gap-2 text-white font-bold group/btn">
                  <span class="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-sky-600 transition-all duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                  <span class="tracking-widest uppercase text-[9px]">Explore More</span>
               </div>
            </div>
          </a>

          <!-- International Tours Card -->
          <a routerLink="/explore/international"
             class="group cat-card relative aspect-square max-w-[500px] mx-auto w-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1.5 transition-all duration-700 cursor-pointer flex items-end opacity-0 translate-x-20">
            <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?fm=webp&fit=crop&w=1200&q=50" 
                 alt="International Tours - Luxury global escapes across continents" 
                 loading="lazy"
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]">
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
            <div class="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition duration-700"></div>

            <div class="relative z-10 w-full p-6 transform transition-transform duration-700 group-hover:-translate-y-2">
               <div class="mb-2 overflow-visible">
                  <h3 class="text-2xl md:text-4xl font-bold !text-white tracking-wide transition-all duration-300 group-hover:text-sky-400 group-hover:scale-105 origin-center drop-shadow-xl">International</h3>
               </div>
               <p class="text-gray-300 text-xs font-medium max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">Across oceans and continents, luxury awaits.</p>

               <div class="mt-4 flex items-center gap-2 text-white font-bold group/btn">
                  <span class="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-indigo-600 transition-all duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                  <span class="tracking-widest uppercase text-[9px]">Explore More</span>
               </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .orb { position: absolute; border-radius: 50%; filter: blur(120px); }
    .orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, #bae6fd 0%, #38bdf8 100%); top: -150px; left: -150px; }
    .orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, #e0f2fe 0%, #0ea5e9 100%); bottom: -100px; right: 8%; opacity: 0.3; }
    .orb-3 { width: 400px; height: 400px; background: radial-gradient(circle, #bae6fd 0%, #38bdf8 100%); top: 30%; right: -200px; }

    /* Floating Particles */
    .particle {
      position: absolute;
      width: 10px;
      height: 10px;
      background: rgba(14, 165, 233, 0.4);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(14, 165, 233, 0.5);
    }
    .p-1 { top: 15%; left: 8%; animation: particle-float 12s infinite alternate linear; }
    .p-2 { top: 35%; right: 12%; animation: particle-float 18s infinite alternate-reverse ease-in-out; width: 6px; height: 6px; }
    .p-3 { bottom: 25%; left: 18%; animation: particle-float 14s infinite alternate-reverse linear; width: 12px; height: 12px; opacity: 0.3; }
    .p-4 { top: 65%; right: 4%; animation: particle-float 22s infinite alternate linear; width: 8px; height: 8px; }
    .p-5 { top: 8%; right: 45%; animation: particle-float 20s infinite alternate linear; }

    @keyframes particle-float {
      0% { transform: translate(0, 0) rotate(0deg); }
      100% { transform: translate(120px, -120px) rotate(360deg); }
    }

    .floating-bubble {
      position: absolute;
      width: 120px; height: 120px;
      border: 2px solid rgba(14, 165, 233, 0.3);
      border-radius: 35px;
      backdrop-filter: blur(5px);
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
        start: 'top 90%',
        once: true
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
        start: 'top 85%',
        once: true
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
