import { Component, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav [ngClass]="scrolled ? 'bg-slate-900 shadow-xl py-3' : 'bg-slate-900/50 backdrop-blur-md py-5'"
         class="fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-in-out">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">

          <!-- Logo & Title -->
          <div class="flex items-center cursor-pointer group" routerLink="/">
            <div class="relative w-16 h-16 sm:w-20 sm:h-20 mr-4 flex items-center justify-center">
              <img src="logo.png" alt="Unique Tours & Travels Logo" class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 brightness-110 contrast-125">
            </div>
            <div class="flex flex-col justify-center">
              <span class="text-white font-extrabold text-xl tracking-tighter leading-none">
                 Unique Tours & Travels
              </span>
              <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-sky-400 mt-1">Explore the World</span>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-7">
            <a routerLink="/"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              Home
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <!-- Tours Dropdown -->
            <div class="relative group cursor-pointer py-2">
              <div class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 flex items-center relative gap-1">
                Tours
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
              </div>
              <!-- Luxury Dropdown Panel -->
              <div class="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-90 group-hover:scale-100 border border-white/10 overflow-hidden z-[60]">
                <div class="p-2 space-y-1">
                  <a routerLink="/explore/domestic" class="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold group/item">
                    <span class="text-sky-400 group-hover/item:scale-110 transition-transform">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span>Domestic Tours</span>
                  </a>
                  <a routerLink="/explore/international" class="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold group/item">
                    <span class="text-sky-400 group-hover/item:scale-110 transition-transform">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    </span>
                    <span>International Tours</span>
                  </a>
                </div>
              </div>
            </div>

            <a routerLink="/explore"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              Explore
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/services"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              Services
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/blog"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              Blog
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/about"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              About Us
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/contact"
               class="px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-lg hover:shadow-sky-500/25 flex items-center bg-sky-500 text-white hover:bg-sky-400 transform hover:-translate-y-1 active:scale-95">
               Contact Us
            </a>
          </div>

          <!-- Mobile Hamburger -->
          <button (click)="mobileOpen = !mobileOpen" class="md:hidden z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 text-white">
            <span class="block w-6 h-0.5 bg-current transition-all duration-300"
                  [ngClass]="mobileOpen ? 'rotate-45 translate-y-2' : ''"></span>
            <span class="block w-6 h-0.5 bg-current transition-all duration-300"
                  [ngClass]="mobileOpen ? 'opacity-0' : ''"></span>
            <span class="block w-6 h-0.5 bg-current transition-all duration-300"
                  [ngClass]="mobileOpen ? '-rotate-45 -translate-y-2' : ''"></span>
          </button>

        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div class="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 transition-all duration-500"
           [ngClass]="mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'"
           (click)="mobileOpen = false"></div>

      <!-- Mobile Menu Panel -->
      <div class="md:hidden fixed top-0 right-0 h-full w-[85%] bg-slate-900 text-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-50 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
           [ngClass]="mobileOpen ? 'translate-x-0' : 'translate-x-full'">
        <div class="p-8 pt-24 space-y-1 flex flex-col items-center text-center">
          <a routerLink="/" (click)="mobileOpen = false" class="w-full py-4 text-xl font-black border-b border-white/5 uppercase tracking-tighter">Home</a>
          <a routerLink="/explore/domestic" (click)="mobileOpen = false" class="w-full py-4 text-xl font-black border-b border-white/5 uppercase tracking-tighter">Domestic Tours</a>
          <a routerLink="/explore/international" (click)="mobileOpen = false" class="w-full py-4 text-xl font-black border-b border-white/5 uppercase tracking-tighter">International Tours</a>
          <a routerLink="/explore" (click)="mobileOpen = false" class="w-full py-4 text-xl font-black border-b border-white/5 uppercase tracking-tighter">Explore</a>
          <a routerLink="/services" (click)="mobileOpen = false" class="w-full py-4 text-xl font-black border-b border-white/5 uppercase tracking-tighter">Services</a>
          <a routerLink="/blog" (click)="mobileOpen = false" class="w-full py-4 text-xl font-black border-b border-white/5 uppercase tracking-tighter text-sky-400">Blog</a>
          <a routerLink="/about" (click)="mobileOpen = false" class="w-full py-4 text-xl font-black border-b border-white/5 uppercase tracking-tighter">About Us</a>
          <a routerLink="/contact" (click)="mobileOpen = false"
             class="w-full mt-8 bg-sky-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20 active:scale-95 text-center">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  scrolled = false;
  mobileOpen = false;
  APP_CONFIG = APP_CONFIG;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @HostListener('window:scroll')
  onScroll() {
    if (this.isBrowser) {
      this.scrolled = window.scrollY > 80;
    }
  }
}
