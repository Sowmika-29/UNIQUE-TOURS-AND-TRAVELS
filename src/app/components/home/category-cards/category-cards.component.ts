import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-cards',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-24 bg-gradient-to-b from-white to-sky-200 relative overflow-hidden">

      <!-- Animated Background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- Large pulsing orbs -->
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>

        <!-- Rising bubbles -->
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
        <div class="bubble bubble-4"></div>
        <div class="bubble bubble-5"></div>
        <div class="bubble bubble-6"></div>

        <!-- 3D rotating shapes -->
        <div class="cube cube-1"></div>
        <div class="cube cube-2"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="text-center mb-16">
          <span class="text-sky-500 font-semibold tracking-wider uppercase text-sm mb-3 block flex items-center justify-center gap-3">
            <span class="w-8 h-[2px] bg-sky-400"></span>
            Choose Your Vibe
            <span class="w-8 h-[2px] bg-sky-400"></span>
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-4">Explore Top Destinations</h2>
          <div class="flex items-center justify-center gap-2">
            <span class="w-12 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"></span>
            <span class="w-3 h-3 bg-sky-500 rounded-full"></span>
            <span class="w-12 h-1 bg-gradient-to-l from-sky-400 to-blue-500 rounded-full"></span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <a routerLink="/explore/domestic"
             class="group relative h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer flex items-end">
            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80" 
                 alt="Domestic Tours" 
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
            <div class="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div class="relative z-10 w-full p-10 text-center transform transition-transform duration-500 group-hover:-translate-y-4">
              <h3 class="text-4xl font-bold text-white mb-3 tracking-wide">Domestic Tours</h3>
              <p class="text-gray-200 text-lg opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 font-medium">Discover the beauty within India</p>
            </div>
            <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-200 z-20">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-500">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          </a>

          <a routerLink="/explore/international"
             class="group relative h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer flex items-end">
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80" 
                 alt="International Tours" 
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
            <div class="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div class="relative z-10 w-full p-10 text-center transform transition-transform duration-500 group-hover:-translate-y-4">
              <h3 class="text-4xl font-bold text-white mb-3 tracking-wide">International Tours</h3>
              <p class="text-gray-200 text-lg opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 font-medium">Experience the globe like never before</p>
            </div>
            <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-200 z-20">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-500">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
    }
    .orb-1 {
      width: 300px; height: 300px;
      background: rgba(56, 189, 248, 0.25);
      top: -50px; right: -50px;
      animation: orb-float 8s ease-in-out infinite;
    }
    .orb-2 {
      width: 250px; height: 250px;
      background: rgba(14, 165, 233, 0.2);
      bottom: -30px; left: -30px;
      animation: orb-float 10s ease-in-out infinite 2s;
    }
    .orb-3 {
      width: 200px; height: 200px;
      background: rgba(56, 189, 248, 0.15);
      top: 40%; left: 40%;
      animation: orb-float 12s ease-in-out infinite 4s;
    }

    .bubble {
      position: absolute;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.3);
      bottom: -20px;
      animation: bubble-up linear infinite;
    }
    .bubble-1 { width: 16px; height: 16px; left: 8%;  animation-duration: 9s; }
    .bubble-2 { width: 12px; height: 12px; left: 25%; animation-duration: 12s; animation-delay: 2s; }
    .bubble-3 { width: 20px; height: 20px; left: 42%; animation-duration: 10s; animation-delay: 1s; }
    .bubble-4 { width: 14px; height: 14px; left: 58%; animation-duration: 11s; animation-delay: 3s; }
    .bubble-5 { width: 18px; height: 18px; left: 75%; animation-duration: 13s; animation-delay: 5s; }
    .bubble-6 { width: 10px; height: 10px; left: 90%; animation-duration: 8s;  animation-delay: 4s; }

    .cube {
      position: absolute;
      border: 2px solid rgba(56, 189, 248, 0.35);
      border-radius: 6px;
    }
    .cube-1 {
      width: 40px; height: 40px;
      top: 15%; right: 12%;
      animation: cube-rotate 12s linear infinite;
    }
    .cube-2 {
      width: 28px; height: 28px;
      bottom: 20%; left: 10%;
      animation: cube-rotate 16s linear infinite reverse;
    }

    @keyframes orb-float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -40px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.95); }
    }
    @keyframes bubble-up {
      0%   { transform: translateY(0) scale(0.5); opacity: 0; }
      10%  { opacity: 0.7; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(-800px) scale(1); opacity: 0; }
    }
    @keyframes cube-rotate {
      0%   { transform: perspective(300px) rotateX(0deg) rotateY(0deg); }
      100% { transform: perspective(300px) rotateX(360deg) rotateY(360deg); }
    }
  `]
})
export class CategoryCardsComponent {}
