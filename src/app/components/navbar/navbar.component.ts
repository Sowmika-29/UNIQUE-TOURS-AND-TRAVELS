import { Component, HostListener, PLATFORM_ID, inject, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav [ngClass]="[
           scrolled ? 'bg-slate-900 shadow-xl py-3' : 'bg-slate-900/50 backdrop-blur-md py-5',
           isSplashActive ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
         ]"
         class="fixed w-full top-0 left-0 z-50 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
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
              <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-light mt-1">Explore the World</span>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-7">
            <a routerLink="/"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              Home
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300"></span>
            </a>

            <!-- Tours Dropdown -->
            <div class="relative group cursor-pointer py-2">
              <div class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 flex items-center relative gap-1">
                Tours
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300"></span>
              </div>
              <!-- Luxury Dropdown Panel -->
              <div class="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-90 group-hover:scale-100 border border-white/10 overflow-hidden z-[60]">
                <div class="p-2 space-y-1">
                  <a routerLink="/explore/domestic" class="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold group/item">
                    <span class="text-brand-light group-hover/item:scale-110 transition-transform">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span>Domestic Tours</span>
                  </a>
                  <a routerLink="/explore/international" class="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold group/item">
                    <span class="text-brand-light group-hover/item:scale-110 transition-transform">
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
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/services"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              Services
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/blog"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              Blog
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/about"
               class="text-white/90 hover:text-white nav-link font-bold text-sm transition-colors duration-300 relative group py-2">
              About Us
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/contact"
               class="px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-lg hover:shadow-brand/25 flex items-center bg-brand text-white hover:bg-brand-light transform hover:-translate-y-1 active:scale-95">
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
      <div class="md:hidden fixed top-0 right-0 h-full w-[80%] bg-slate-900/95 backdrop-blur-2xl text-white shadow-[-20px_0_80px_rgba(0,0,0,0.5)] z-[100] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
           [ngClass]="mobileOpen ? 'translate-x-0' : 'translate-x-full'">
        
        <!-- Header area for mobile menu -->
        <div class="p-6 border-b border-white/10 flex justify-between items-center">
          <div class="flex flex-col">
            <span class="font-black text-lg tracking-tighter">UNIQUE</span>
            <span class="text-[8px] uppercase tracking-widest text-brand-light">Navigation Menu</span>
          </div>
          <button (click)="mobileOpen = false" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="p-6 space-y-2 flex flex-col h-[calc(100%-80px)] overflow-y-auto">
          <a routerLink="/" (click)="mobileOpen = false" class="mobile-nav-item">Home</a>
          
          <div class="py-2 border-b border-white/5">
             <span class="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3 block">Tour Collections</span>
             <div class="grid grid-cols-1 gap-1">
                <a routerLink="/explore/domestic" (click)="mobileOpen = false" class="mobile-sub-item">Domestic Tours</a>
                <a routerLink="/explore/international" (click)="mobileOpen = false" class="mobile-sub-item">International Tours</a>
             </div>
          </div>

          <a routerLink="/explore" (click)="mobileOpen = false" class="mobile-nav-item">Explore All</a>
          <a routerLink="/services" (click)="mobileOpen = false" class="mobile-nav-item">Our Services</a>
          <a routerLink="/blog" (click)="mobileOpen = false" class="mobile-nav-item group flex justify-between items-center">
            Blog
            <span class="text-[8px] bg-brand text-white px-2 py-0.5 rounded-full">New</span>
          </a>
          <a routerLink="/about" (click)="mobileOpen = false" class="mobile-nav-item">About Us</a>
          
          <div class="mt-auto pt-8">
            <a routerLink="/contact" (click)="mobileOpen = false"
               class="w-full bg-brand text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-light transition-all shadow-xl shadow-brand/20 active:scale-95 text-center flex items-center justify-center gap-3">
              <span>Contact Us</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            
            <!-- Branding/Social Footer -->
            <div class="mt-8 text-center text-slate-500">
               <p class="text-[10px] uppercase tracking-widest">Connect With Us</p>
               <div class="flex justify-center gap-4 mt-4">
                  <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:text-brand transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></div>
                  <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:text-brand transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c.796 0 1.441-.645 1.441-1.441s-.645-1.441-1.441-1.441-1.441.645-1.441 1.441.645 1.441 1.441 1.441z"/></svg></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .mobile-nav-item {
      @apply w-full py-4 text-lg font-black border-b border-white/5 uppercase tracking-tighter flex items-center justify-between transition-all;
    }
    .mobile-nav-item:hover {
      @apply pl-2 text-brand-light border-brand/20;
    }
    .mobile-sub-item {
      @apply py-2.5 px-4 text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all block;
    }
  `]
})
export class NavbarComponent {
  @Input() isSplashActive = false;
  
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
