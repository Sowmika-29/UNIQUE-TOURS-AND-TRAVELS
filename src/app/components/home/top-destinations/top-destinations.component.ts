import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-destinations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-24 relative overflow-hidden bg-gradient-to-br from-sky-200 via-sky-100 to-sky-200">

      <!-- 3D Animated Background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- Floating gradient orbs -->
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>

        <!-- 3D spinning shapes -->
        <div class="rotate-box rb-1"></div>
        <div class="rotate-box rb-2"></div>
        <div class="rotate-box rb-3"></div>
        <div class="rotate-box rb-4"></div>

        <!-- Floating dots -->
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
        <div class="dot dot-4"></div>
        <div class="dot dot-5"></div>

        <!-- Animated wave -->
        <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style="height: 80px;">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z" fill="rgba(56, 189, 248, 0.15)">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z;
                      M0,80 C360,20 720,100 1080,40 C1260,60 1380,80 1440,50 L1440,120 L0,120 Z;
                      M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"/>
          </path>
          <path d="M0,80 C480,20 960,100 1440,40 L1440,120 L0,120 Z" fill="rgba(56, 189, 248, 0.1)">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0,80 C480,20 960,100 1440,40 L1440,120 L0,120 Z;
                      M0,50 C480,100 960,20 1440,70 L1440,120 L0,120 Z;
                      M0,80 C480,20 960,100 1440,40 L1440,120 L0,120 Z"/>
          </path>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div class="text-center mb-16">
          <span class="text-sky-500 font-bold tracking-wider uppercase text-sm mb-2 block">Featured Experiences</span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight animate-heading">Top Destinations</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <a *ngFor="let dest of topDestinations; let i = index"
             [routerLink]="['/destination', dest.id]"
             class="group relative h-[360px] rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all duration-500 cursor-pointer flex items-end animate-heading"
             [style.animation-delay]="(i * 0.1) + 's'">

            <img [src]="dest.image" [alt]="dest.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
            <div class="absolute inset-0 bg-sky-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="relative z-10 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
              <h3 class="text-3xl font-bold text-white mb-2 drop-shadow-md group-hover:text-sky-100 transition-colors">{{dest.name}}</h3>
              <div class="w-12 h-1 bg-sky-500 transform origin-left transition-transform duration-300 group-hover:scale-x-[2]"></div>
            </div>

          </a>

        </div>

        <!-- CTA Button -->
        <div class="text-center mt-14 animate-heading" style="animation-delay: 0.6s">
          <a routerLink="/explore" class="explore-btn group">
            <span class="btn-shimmer"></span>
            <span class="btn-glow"></span>
            <span class="relative z-10 flex items-center gap-3">
              Explore All Destinations
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
          </a>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
    }
    .orb-1 {
      width: 350px; height: 350px;
      background: rgba(56, 189, 248, 0.3);
      top: -60px; left: -60px;
      animation: orb-move 14s ease-in-out infinite;
    }
    .orb-2 {
      width: 400px; height: 400px;
      background: rgba(14, 165, 233, 0.2);
      bottom: -80px; right: -80px;
      animation: orb-move 18s ease-in-out infinite 3s;
    }
    .orb-3 {
      width: 250px; height: 250px;
      background: rgba(56, 189, 248, 0.2);
      top: 40%; left: 45%;
      animation: orb-move 12s ease-in-out infinite 6s;
    }

    .rotate-box {
      position: absolute;
      border: 3px solid rgba(56, 189, 248, 0.4);
      animation: box-spin linear infinite;
    }
    .rb-1 { width: 50px; height: 50px; border-radius: 10px; top: 12%; right: 14%; animation-duration: 10s; }
    .rb-2 { width: 35px; height: 35px; border-radius: 8px;  bottom: 18%; left: 6%;  animation-duration: 14s; animation-direction: reverse; }
    .rb-3 { width: 28px; height: 28px; border-radius: 50%;  top: 55%; right: 5%;  animation-duration: 18s; }
    .rb-4 { width: 20px; height: 20px; border-radius: 4px;  top: 30%; left: 3%;   animation-duration: 12s; animation-direction: reverse; }

    .dot {
      position: absolute;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.45);
      bottom: 0;
      animation: dot-rise linear infinite;
    }
    .dot-1 { width: 10px; height: 10px; left: 10%; animation-duration: 8s; }
    .dot-2 { width: 14px; height: 14px; left: 30%; animation-duration: 11s; animation-delay: 2s; }
    .dot-3 { width: 8px;  height: 8px;  left: 50%; animation-duration: 9s;  animation-delay: 4s; }
    .dot-4 { width: 12px; height: 12px; left: 70%; animation-duration: 10s; animation-delay: 1s; }
    .dot-5 { width: 10px; height: 10px; left: 88%; animation-duration: 7s;  animation-delay: 3s; }

    @keyframes orb-move {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(50px, -40px) scale(1.15); }
      50% { transform: translate(-30px, 30px) scale(0.9); }
      75% { transform: translate(40px, 20px) scale(1.1); }
    }
    @keyframes box-spin {
      0%   { transform: perspective(400px) rotateX(0deg) rotateY(0deg); }
      100% { transform: perspective(400px) rotateX(360deg) rotateY(360deg); }
    }
    @keyframes dot-rise {
      0%   { transform: translateY(0); opacity: 0; }
      10%  { opacity: 0.8; }
      85%  { opacity: 0.3; }
      100% { transform: translateY(-700px); opacity: 0; }
    }

    /* Premium CTA Button */
    .explore-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 18px 48px;
      border-radius: 9999px;
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
      background: linear-gradient(135deg, #0ea5e9, #3b82f6, #0ea5e9);
      background-size: 200% 200%;
      animation: gradient-shift 4s ease infinite;
      box-shadow: 0 8px 30px rgba(14, 165, 233, 0.4);
      overflow: hidden;
      transition: all 0.3s ease;
      text-decoration: none;
      cursor: pointer;
    }
    .explore-btn:hover {
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 12px 40px rgba(14, 165, 233, 0.55);
    }

    .btn-shimmer {
      position: absolute;
      top: 0; left: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transform: translateX(-100%);
      animation: shimmer-sweep 3s ease-in-out infinite;
    }

    .btn-glow {
      position: absolute;
      inset: -3px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #38bdf8, #818cf8, #38bdf8);
      background-size: 200% 200%;
      animation: gradient-shift 4s ease infinite;
      z-index: -1;
      opacity: 0.6;
      filter: blur(8px);
    }

    @keyframes gradient-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes shimmer-sweep {
      0%   { transform: translateX(-100%); }
      50%  { transform: translateX(250%); }
      100% { transform: translateX(250%); }
    }
  `]
})
export class TopDestinationsComponent {
  topDestinations = [
    { id: 'kerala', name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
    { id: 'goa', name: 'Goa', image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80' },
    { id: 'rajasthan', name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80' },
    { id: 'jammu-kashmir', name: 'Kashmir', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
    { id: 'dubai', name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80' },
    { id: 'bali', name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' }
  ];
}
