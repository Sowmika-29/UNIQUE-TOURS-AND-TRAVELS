import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-top-destinations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-24 relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-white hero-trigger">

      <!-- Premium Animated Background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="orb orb-1 opacity-20"></div>
        <div class="orb orb-2 opacity-20"></div>
        <div class="orb orb-3 opacity-20"></div>

        <!-- Floating 3D-like elements -->
        <div class="rotate-box rb-1 floating-element" data-speed="0.05"></div>
        <div class="rotate-box rb-2 floating-element" data-speed="-0.03"></div>
        <div class="rotate-box rb-3 floating-element" data-speed="0.04"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div class="text-center mb-16 section-header opacity-0 translate-y-10">
          <span class="text-sky-500 font-bold tracking-widest uppercase text-sm mb-3 block flex items-center justify-center gap-3">
            <span class="w-8 h-[2px] bg-sky-400"></span>
            Handpicked for You
            <span class="w-8 h-[2px] bg-sky-400"></span>
          </span>
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">Top Destinations</h2>
          <div class="flex items-center justify-center gap-2">
            <span class="w-16 h-1 bg-sky-500 rounded-full"></span>
            <span class="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></span>
            <span class="w-16 h-1 bg-sky-500 rounded-full"></span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 destination-grid">

          <a *ngFor="let dest of topDestinations; let i = index"
             [routerLink]="['/destination', dest.id]"
             class="group destination-card relative h-[450px] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden opacity-0 translate-y-20">

            <img [src]="dest.image" [alt]="dest.name + ' travel destination - Unique Tours & Travels'" 
                 loading="lazy"
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <!-- Tilt & Glow Card Effect -->
            <div class="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
              <span class="inline-block px-3 py-1 bg-sky-500/20 backdrop-blur-md border border-white/20 text-sky-300 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                Explore Destination
              </span>
              <h3 class="text-4xl font-bold text-white drop-shadow-2xl group-hover:text-sky-100 transition-colors tracking-tight">{{dest.name}}</h3>
              <div class="w-0 group-hover:w-20 h-1 bg-sky-500 mt-3 transition-all duration-700 delay-100"></div>
            </div>

            <!-- Interactive Overlay -->
            <div class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform rotate-45 group-hover:rotate-0 transition-all duration-500">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
          </a>

        </div>

        <!-- CTA Section -->
        <div class="text-center mt-20 cta-reveal opacity-0 scale-95">
          <a routerLink="/explore" class="premium-btn group">
            <span class="btn-ripple"></span>
            <span class="relative z-10 flex items-center gap-4">
              Explore All Destinations
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                 <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </div>
            </span>
          </a>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); }
    .orb-1 { width: 500px; height: 500px; background: rgba(14, 165, 233, 0.15); top: -100px; left: -100px; }
    .orb-2 { width: 600px; height: 600px; background: rgba(79, 70, 229, 0.1); bottom: -150px; right: -150px; }
    .orb-3 { width: 400px; height: 400px; background: rgba(14, 165, 233, 0.1); top: 30%; left: 40%; }

    .rotate-box { 
      position: absolute; 
      border: 2px solid rgba(14, 165, 233, 0.2); 
    }
    .rb-1 { width: 80px; height: 80px; border-radius: 20px; top: 15%; right: 10%; }
    .rb-2 { width: 60px; height: 60px; border-radius: 15px; bottom: 20%; left: 8%; }
    .rb-3 { width: 40px; height: 40px; border-radius: 50%; top: 45%; right: 5%; }

    .premium-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 20px 56px;
      border-radius: 30px;
      font-size: 1.25rem;
      font-weight: 900;
      color: white;
      background: #0f172a;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .premium-btn:hover {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 30px 60px rgba(14, 165, 233, 0.3);
      background: #0ea5e9;
    }
    .btn-ripple {
      position: absolute;
      top: 50%; left: 50%;
      width: 0%; height: 0%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    .premium-btn:hover .btn-ripple {
      width: 300%; height: 300%;
    }
  `]
})
export class TopDestinationsComponent implements AfterViewInit {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  topDestinations = [
    { id: 'kerala', name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?fm=webp&fit=crop&w=1200&q=50' },
    { id: 'goa', name: 'Goa', image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?fm=webp&fit=crop&w=1200&q=50' },
    { id: 'manali', name: 'Manali', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?fm=webp&fit=crop&w=1200&q=50' },
    { id: 'jammu-kashmir', name: 'Kashmir', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?fm=webp&fit=crop&w=1200&q=50' },
    { id: 'dubai', name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?fm=webp&fit=crop&w=1200&q=50' },
    { id: 'bali', name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?fm=webp&fit=crop&w=1200&q=50' }
  ];

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    // Reveal Section Header
    gsap.to('.section-header', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.section-header',
        start: 'top 85%'
      }
    });

    // Reveal Destination Cards in Staggered Fashion
    gsap.to('.destination-card', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.destination-grid',
        start: 'top 80%'
      }
    });

    // Reveal CTA Button
    gsap.to('.cta-reveal', {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.cta-reveal',
        start: 'top 90%'
      }
    });

    // Floating Background Elements Handled by GSAP
    gsap.utils.toArray<HTMLElement>('.floating-element').forEach(el => {
      const speed = parseFloat(el.dataset['speed'] || '0.05');
      gsap.to(el, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          scrub: true,
          trigger: '.hero-trigger',
          start: 'top bottom',
          end: 'bottom top'
        }
      });
    });
  }
}
