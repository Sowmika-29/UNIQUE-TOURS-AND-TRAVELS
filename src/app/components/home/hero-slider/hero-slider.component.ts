import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-slate-900 group hero-container">
      
      <!-- Animated particle overlay -->
      <div class="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
        <div *ngFor="let p of [1,2,3,4,5,6,7,8]" class="hero-particle hp-{{p}}"></div>
      </div>

      <!-- Images -->
      <div *ngFor="let slide of slides; let i = index" 
           class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
           [ngClass]="i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'">
        
        <img [src]="slide.image" [alt]="slide.title" 
             class="absolute inset-0 w-full h-full object-cover origin-center hero-image"
             [ngClass]="i === currentIndex ? 'scale-110 active-slide' : 'scale-100'">
        
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <!-- Content -->
        <div class="absolute inset-0 flex items-center justify-center z-20">
          <div class="text-center px-4 max-w-4xl mx-auto hero-content" *ngIf="i === currentIndex">
            <!-- Primary SEO Heading -->
            <h1 class="sr-only">Explore the World with Unique Tours & Travels</h1>
            
            <span class="hero-subtitle text-sky-100 font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 block drop-shadow-lg opacity-0">
               {{slide.subtitle}}
            </span>
            <h2 class="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-xl tracking-tighter opacity-0">
              {{slide.title}}
            </h2>
            <p class="hero-desc text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md opacity-0">
              {{slide.description}}
            </p>
            <div class="hero-btns flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0">
              <a routerLink="/explore" class="bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-sky-600 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] text-center">
                Explore The World
              </a>
              <a href="https://wa.me/919597371949" target="_blank" class="glass-panel text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 text-center border border-white/20">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Custom Controls -->
      <button (click)="prev()" class="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:bg-sky-500 hover:border-sky-500 transition-colors opacity-0 group-hover:opacity-100 hidden md:flex border border-white/20">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button (click)="next()" class="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:bg-sky-500 hover:border-sky-500 transition-colors opacity-0 group-hover:opacity-100 hidden md:flex border border-white/20">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      <!-- Indicators -->
      <div class="absolute bottom-10 left-0 w-full flex justify-center space-x-3 z-30">
        <button *ngFor="let slide of slides; let i = index" 
                (click)="goToSlide(i)"
                class="w-3 h-3 rounded-full transition-all duration-300"
                [ngClass]="i === currentIndex ? 'bg-sky-500 w-8' : 'bg-white/50 hover:bg-white'"></button>
      </div>

    </div>
  `,
  styles: [`
    .glass-panel {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }
    .hero-particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      bottom: -20px;
      animation: hero-rise linear infinite;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    .hp-1 { width: 8px;  height: 8px;  left: 5%;  animation-duration: 10s; }
    .hp-2 { width: 12px; height: 12px; left: 15%; animation-duration: 14s; animation-delay: 1s; }
    .hp-3 { width: 6px;  height: 6px;  left: 30%; animation-duration: 11s; animation-delay: 3s; }
    .hp-4 { width: 14px; height: 14px; left: 45%; animation-duration: 16s; animation-delay: 2s; }
    .hp-5 { width: 8px;  height: 8px;  left: 60%; animation-duration: 12s; animation-delay: 5s; }
    .hp-6 { width: 10px; height: 10px; left: 75%; animation-duration: 13s; animation-delay: 4s; }
    .hp-7 { width: 6px;  height: 6px;  left: 88%; animation-duration: 10s; animation-delay: 6s; }
    .hp-8 { width: 10px; height: 10px; left: 95%; animation-duration: 15s; animation-delay: 7s; }

    @keyframes hero-rise {
      0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
      20%  { opacity: 0.6; }
      80%  { opacity: 0.2; }
      100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
    }
  `]
})
export class HeroSliderComponent implements OnInit, OnDestroy, AfterViewInit {
  slides = [
    {
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=webp&fit=crop&w=1920&q=50",
      title: "Explore the World with Us",
      subtitle: "PREMIUM JOURNEYS",
      description: "Discover destinations that inspire you."
    },
    {
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?fm=webp&fit=crop&w=1920&q=50",
      title: "Paradise Awaits",
      subtitle: "TROPICAL ESCAPES",
      description: "Unwind on the world's most pristine beaches."
    },
    {
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?fm=webp&fit=crop&w=1920&q=50",
      title: "Epic Adventures",
      subtitle: "THRILL SEEKERS",
      description: "Conquer mountains and chart unknown territories."
    },
    {
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fm=webp&fit=crop&w=1920&q=50",
      title: "Cultural Wonders",
      subtitle: "HERITAGE TOURS",
      description: "Step back in time through majestic histories."
    },
    {
      image: "https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?fm=webp&fit=crop&w=1920&q=50",
      title: "City Escapes",
      subtitle: "URBAN EXPLORATION",
      description: "Feel the vibrant pulse of iconic metropoles."
    }
  ];

  currentIndex = 0;
  private intervalId: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startSlideShow();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initGSAP();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.stopSlideShow();
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }

  private initGSAP() {
    // Parallax Effect
    gsap.to('.hero-image', {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    this.animateText();
  }

  private animateText() {
    const tl = gsap.timeline();
    tl.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo('.hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.5')
      .fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }

  startSlideShow() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 6000);
  }

  stopSlideShow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.resetTimer();
    setTimeout(() => this.animateText(), 100);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.resetTimer();
    setTimeout(() => this.animateText(), 100);
  }

  goToSlide(index: number) {
    if (this.currentIndex === index) return;
    this.currentIndex = index;
    this.resetTimer();
    setTimeout(() => this.animateText(), 100);
  }

  resetTimer() {
    this.stopSlideShow();
    this.startSlideShow();
  }
}
