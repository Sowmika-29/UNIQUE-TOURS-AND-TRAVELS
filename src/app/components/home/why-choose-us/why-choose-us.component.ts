import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 md:py-20 bg-gradient-to-br from-white via-sky-50 to-white relative overflow-hidden why-section">

      <!-- Premium Background Effects -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="mesh mesh-1 opacity-20"></div>
        <div class="mesh mesh-2 opacity-20"></div>
        
        <div class="floating-ring ring-1"></div>
        <div class="floating-ring ring-2"></div>
      </div>

      <div class="max-w-[1200px] mx-auto px-4 relative z-10 w-full">

        <div class="text-center mb-8 why-header opacity-0 translate-y-10">
          <h2 class="text-3xl md:text-5xl font-black tracking-tighter">
            <span class="text-skyblue">Why</span>
            <span class="text-dark"> Unique Tours & Travels</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 feature-grid">

          <div class="feature-card bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100 flex flex-col items-center text-center opacity-0 translate-y-20 h-full">
            <div class="w-16 h-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-sky-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-3 tracking-tight">Trusted Experts</h3>
            <p class="text-slate-500 text-sm leading-relaxed">Over a decade of expertise in crafting seamless journeys with professional care.</p>
          </div>

          <div class="feature-card bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100 flex flex-col items-center text-center opacity-0 translate-y-20 h-full">
            <div class="w-16 h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-6 transform group-hover:-rotate-12 transition-transform duration-500 shadow-lg shadow-indigo-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-3 tracking-tight">Handpicked</h3>
            <p class="text-slate-500 text-sm leading-relaxed">We personally vet every hotel and guide to ensure the highest standards of safety.</p>
          </div>

          <div class="feature-card bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100 flex flex-col items-center text-center opacity-0 translate-y-20 h-full">
            <div class="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-3 tracking-tight">Best Value</h3>
            <p class="text-slate-500 text-sm leading-relaxed">Premium travel experiences at competitive prices, giving you more memories.</p>
          </div>

          <div class="feature-card bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100 flex flex-col items-center text-center opacity-0 translate-y-20 h-full">
            <div class="w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-rose-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-3 tracking-tight">24/7 Support</h3>
            <p class="text-slate-500 text-sm leading-relaxed">Our dedicated team is available around the clock to assist you at every step.</p>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .mesh { position: absolute; border-radius: 50%; filter: blur(80px); }
    .mesh-1 { width: 500px; height: 500px; background: rgba(14, 165, 233, 0.1); top: -200px; left: -200px; }
    .mesh-2 { width: 400px; height: 400px; background: rgba(99, 102, 241, 0.1); bottom: -100px; right: -100px; }

    .floating-ring {
      position: absolute;
      border: 2px solid rgba(14, 165, 233, 0.1);
      border-radius: 50%;
    }
    .ring-1 { width: 150px; height: 150px; top: 10%; right: 10%; }
    .ring-2 { width: 100px; height: 100px; bottom: 15%; left: 5%; }
  `]
})
export class WhyChooseUsComponent implements AfterViewInit {
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
    gsap.to('.why-header', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.why-section',
        start: 'top 85%'
      }
    });

    // Feature Cards Reveal
    gsap.to('.feature-card', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.feature-grid',
        start: 'top 80%'
      }
    });

    // Rings Animation
    gsap.to('.floating-ring', {
      scale: 1.2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}
