import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-4 md:py-8 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 relative overflow-hidden">

      <!-- Animated background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
        <div class="float-circle fc-1"></div>
        <div class="float-circle fc-2"></div>
        <div class="float-circle fc-3"></div>
        <div class="float-circle fc-4"></div>
        <div class="float-circle fc-5"></div>
        <div class="float-circle fc-6"></div>
      </div>

      <div class="max-w-[1200px] mx-auto px-4 relative z-10 w-full">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">

          <div *ngFor="let stat of stats; let i = index" class="stat-card">
            <div class="text-3xl md:text-5xl font-bold mb-1 drop-shadow-lg">
              {{ stat.current }}{{ stat.suffix }}
            </div>
            <div class="text-white/80 font-bold text-xs uppercase tracking-widest">{{ stat.label }}</div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .stat-card {
      animation: pop-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }
    .stat-card:nth-child(1) { animation-delay: 0.1s; }
    .stat-card:nth-child(2) { animation-delay: 0.2s; }
    .stat-card:nth-child(3) { animation-delay: 0.3s; }
    .stat-card:nth-child(4) { animation-delay: 0.4s; }

    .wave {
      position: absolute;
      width: 200%;
      height: 200%;
      border-radius: 40%;
      opacity: 0.08;
      background: white;
    }
    .wave-1 {
      top: -120%; left: -50%;
      animation: wave-spin 25s linear infinite;
    }
    .wave-2 {
      top: -130%; left: -30%;
      animation: wave-spin 30s linear infinite reverse;
    }
    .wave-3 {
      top: -125%; left: -40%;
      animation: wave-spin 20s linear infinite;
      opacity: 0.05;
    }

    .float-circle {
      position: absolute;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.15);
      animation: float-up ease-in-out infinite;
    }
    .fc-1 { width: 20px; height: 20px; left: 5%;  bottom: -20px; animation-duration: 8s; }
    .fc-2 { width: 14px; height: 14px; left: 20%; bottom: -20px; animation-duration: 12s; animation-delay: 1s; }
    .fc-3 { width: 24px; height: 24px; left: 40%; bottom: -20px; animation-duration: 10s; animation-delay: 3s; }
    .fc-4 { width: 16px; height: 16px; left: 60%; bottom: -20px; animation-duration: 9s;  animation-delay: 2s; }
    .fc-5 { width: 20px; height: 20px; left: 80%; bottom: -20px; animation-duration: 11s; animation-delay: 4s; }
    .fc-6 { width: 12px; height: 12px; left: 92%; bottom: -20px; animation-duration: 7s;  animation-delay: 5s; }

    @keyframes pop-in {
      from { opacity: 0; transform: scale(0.5) translateY(30px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes wave-spin {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes float-up {
      0%, 100% { transform: translateY(0); opacity: 0; }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.3; }
      50%  { transform: translateY(-300px); }
    }
  `]
})
export class StatsCounterComponent implements OnInit, OnDestroy {
  stats = [
    { label: 'Happy Travelers', target: 5000, current: 0, suffix: '+' },
    { label: 'Destinations', target: 50, current: 0, suffix: '+' },
    { label: 'Tour Packages', target: 120, current: 0, suffix: '+' },
    { label: 'Years Experience', target: 10, current: 0, suffix: '+' }
  ];

  private isBrowser: boolean;
  private animationId: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.animateCounters();
    }
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  animateCounters() {
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      this.stats.forEach(stat => {
        stat.current = Math.round(stat.target * ease);
      });

      if (progress < 1) {
        this.animationId = requestAnimationFrame(step);
      }
    };

    this.animationId = requestAnimationFrame(step);
  }
}
