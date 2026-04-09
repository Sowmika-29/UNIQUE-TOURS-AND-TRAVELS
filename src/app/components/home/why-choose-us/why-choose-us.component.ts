import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  template: `
    <section class="py-24 bg-gradient-to-br from-sky-200 via-sky-100 to-sky-200 relative overflow-hidden">

      <!-- Animated 3D Background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="mesh mesh-1"></div>
        <div class="mesh mesh-2"></div>
        <div class="mesh mesh-3"></div>

        <div class="spin-shape shape-1"></div>
        <div class="spin-shape shape-2"></div>
        <div class="spin-shape shape-3"></div>

        <div class="particle p-1"></div>
        <div class="particle p-2"></div>
        <div class="particle p-3"></div>
        <div class="particle p-4"></div>
        <div class="particle p-5"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        <div class="text-center mb-16">
          <span class="text-sky-500 font-bold tracking-wider uppercase text-sm mb-2 block">Why Us</span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight animate-heading">Why Choose Us</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-sky-100 hover:border-sky-300 flex flex-col items-center text-center animate-heading" style="animation-delay: 0.2s">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Trusted Travel Experts</h3>
            <p class="text-slate-500 text-sm leading-relaxed">Years of experience crafting seamless itineraries with reliable partnerships across India and abroad.</p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-sky-100 hover:border-sky-300 flex flex-col items-center text-center animate-heading" style="animation-delay: 0.3s">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Handpicked Destinations</h3>
            <p class="text-slate-500 text-sm leading-relaxed">Every location is personally vetted to ensure memorable, authentic, and safe travel experiences.</p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-sky-100 hover:border-sky-300 flex flex-col items-center text-center animate-heading" style="animation-delay: 0.4s">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Affordable & Quality</h3>
            <p class="text-slate-500 text-sm leading-relaxed">Premium experiences at competitive prices, no hidden costs, transparent billing from start to finish.</p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-sky-100 hover:border-sky-300 flex flex-col items-center text-center animate-heading" style="animation-delay: 0.5s">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">24/7 Support</h3>
            <p class="text-slate-500 text-sm leading-relaxed">Round-the-clock assistance before, during, and after your trip via WhatsApp, call, or email.</p>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .mesh {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
    }
    .mesh-1 {
      width: 400px; height: 400px;
      background: rgba(56, 189, 248, 0.3);
      top: -100px; left: -100px;
      animation: mesh-move 20s ease-in-out infinite;
    }
    .mesh-2 {
      width: 350px; height: 350px;
      background: rgba(14, 165, 233, 0.25);
      bottom: -80px; right: -80px;
      animation: mesh-move 25s ease-in-out infinite 5s;
    }
    .mesh-3 {
      width: 250px; height: 250px;
      background: rgba(56, 189, 248, 0.2);
      top: 30%; left: 50%;
      animation: mesh-move 18s ease-in-out infinite 8s;
    }

    .spin-shape {
      position: absolute;
      border: 3px solid rgba(56, 189, 248, 0.4);
      border-radius: 8px;
      animation: shape-spin linear infinite;
    }
    .shape-1 { width: 50px; height: 50px; top: 10%; right: 15%; animation-duration: 10s; }
    .shape-2 { width: 35px; height: 35px; bottom: 15%; left: 8%; animation-duration: 14s; animation-direction: reverse; }
    .shape-3 { width: 25px; height: 25px; top: 55%; right: 6%; animation-duration: 18s; }

    .particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.5);
      bottom: -10px;
      animation: rise linear infinite;
    }
    .p-1 { width: 10px; height: 10px; left: 12%; animation-duration: 7s; }
    .p-2 { width: 14px; height: 14px; left: 35%; animation-duration: 9s; animation-delay: 2s; }
    .p-3 { width: 8px;  height: 8px;  left: 55%; animation-duration: 8s; animation-delay: 4s; }
    .p-4 { width: 12px; height: 12px; left: 72%; animation-duration: 10s; animation-delay: 1s; }
    .p-5 { width: 10px; height: 10px; left: 90%; animation-duration: 6s; animation-delay: 3s; }

    @keyframes mesh-move {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(60px, -40px) scale(1.15); }
      50% { transform: translate(-30px, 50px) scale(0.9); }
      75% { transform: translate(40px, 30px) scale(1.1); }
    }
    @keyframes shape-spin {
      0%   { transform: perspective(300px) rotateX(0deg) rotateY(0deg); }
      100% { transform: perspective(300px) rotateX(360deg) rotateY(360deg); }
    }
    @keyframes rise {
      0%   { transform: translateY(0); opacity: 0; }
      10%  { opacity: 0.8; }
      80%  { opacity: 0.4; }
      100% { transform: translateY(-700px); opacity: 0; }
    }
  `]
})
export class WhyChooseUsComponent {}
