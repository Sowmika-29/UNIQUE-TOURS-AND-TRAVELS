import { Component, HostListener, PLATFORM_ID, inject, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- HEADER -->
    <nav [ngClass]="[
           scrolled ? 'bg-slate-900 shadow-xl' : 'bg-slate-900/80 backdrop-blur-md',
           isSplashActive ? '-translate-y-full' : 'translate-y-0'
         ]"
         class="fixed w-full top-0 left-0 z-[100] transition-all duration-500 h-[65px] md:h-20 flex items-center">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="flex items-center justify-between w-full">
          
          <!-- LEFT: LOGO + TITLE -->
          <div class="flex items-center cursor-pointer group shrink-0" routerLink="/" (click)="closeMenu()">
            <img src="/logo.png" alt="Unique Logo" class="h-10 w-10 md:h-14 md:w-14 object-contain mr-2 md:mr-3">
            <div class="flex flex-col justify-center">
              <span class="text-white font-black tracking-tighter text-[14px] xs-text-13 md:text-2xl uppercase whitespace-nowrap leading-none">
                 <span class="lg:hidden">Unique Tours</span>
                 <span class="hidden lg:inline">Unique Tours & Travels</span>
              </span>
              <span class="hidden md:block text-[9px] text-brand-light uppercase tracking-widest font-bold mt-1">Explore the World</span>
            </div>
          </div>

          <!-- RIGHT: NAV / HAMBURGER -->
          <div class="flex items-center">
             <!-- Desktop Links (Large screens) -->
             <div class="hidden lg:flex items-center space-x-7">
                <a routerLink="/" routerLinkActive="active-nav" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Home</a>
                
                <div class="relative group">
                  <span class="nav-link !flex items-center gap-1 cursor-pointer">
                    Destinations
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                  <div class="absolute top-full left-0 w-48 bg-slate-900 shadow-2xl rounded-xl py-2 mt-2 border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <a routerLink="/explore/domestic" class="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">Domestic Tours</a>
                    <a routerLink="/explore/international" class="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">International Tours</a>
                  </div>
                </div>

                <a routerLink="/services" routerLinkActive="active-nav" class="nav-link">Services</a>
                <a routerLink="/blog" routerLinkActive="active-nav" class="nav-link">Blogs</a>
                <a routerLink="/about" routerLinkActive="active-nav" class="nav-link">About Us</a>
                <a routerLink="/contact" class="px-6 py-2.5 bg-brand text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-light transition-all shadow-lg active:scale-95">Contact</a>
             </div>

             <!-- Mobile Hamburger -->
             <button (click)="toggleMenu()" 
                     class="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none relative z-[150]"
                     aria-label="Toggle Menu">
                <span class="block w-7 h-0.5 bg-white transition-all duration-300" [ngClass]="{'rotate-45 translate-y-2': mobileOpen}"></span>
                <span class="block w-7 h-0.5 bg-white transition-all duration-300" [ngClass]="{'opacity-0': mobileOpen}"></span>
                <span class="block w-7 h-0.5 bg-white transition-all duration-300" [ngClass]="{'-rotate-45 -translate-y-2': mobileOpen}"></span>
             </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- MOBILE SIDEBAR DRAWER -->
    <!-- Dark Backdrop -->
    <div *ngIf="mobileOpen" 
         (click)="closeMenu()"
         class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300">
    </div>

    <!-- Drawer Panel -->
    <div class="lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[120] shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
         [ngClass]="mobileOpen ? 'translate-x-0' : 'translate-x-full'">
         
         <div class="flex flex-col h-full bg-white">
            <!-- Header with Close Button -->
            <div class="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
               <div class="flex items-center gap-2">
                  <img src="/logo.png" class="h-8 w-8 object-contain" alt="Logo">
                  <span class="font-black text-slate-800 text-sm tracking-tight">UNIQUE TOURS</span>
               </div>
               <button (click)="closeMenu()" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>

            <!-- Navigation Links -->
            <div class="flex-grow overflow-y-auto pt-4 pb-10 px-4 space-y-1">
               <a routerLink="/" (click)="closeMenu()" routerLinkActive="mobile-active" [routerLinkActiveOptions]="{exact: true}" class="mobile-nav-item">
                  <span>Home</span>
               </a>
               
               <div class="flex flex-col">
                  <button (click)="destinationsOpen = !destinationsOpen" 
                          class="mobile-nav-item w-full flex items-center justify-between group"
                          [ngClass]="{'text-brand bg-slate-50': destinationsOpen}">
                     <span>Destinations</span>
                     <svg class="w-4 h-4 transition-transform duration-300" [ngClass]="{'rotate-180': destinationsOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div *ngIf="destinationsOpen" class="pl-4 mt-2 mb-4 space-y-1 animate-slide-in">
                     <a routerLink="/explore/domestic" (click)="closeMenu()" routerLinkActive="!text-brand" class="mobile-sub-item">Domestic Tours</a>
                     <a routerLink="/explore/international" (click)="closeMenu()" routerLinkActive="!text-brand" class="mobile-sub-item">International Tours</a>
                  </div>
               </div>

               <a routerLink="/services" (click)="closeMenu()" routerLinkActive="mobile-active" class="mobile-nav-item">Services</a>
               <a routerLink="/blog" (click)="closeMenu()" routerLinkActive="mobile-active" class="mobile-nav-item">Blogs</a>
               <a routerLink="/about" (click)="closeMenu()" routerLinkActive="mobile-active" class="mobile-nav-item">About Us</a>
               <a routerLink="/contact" (click)="closeMenu()" routerLinkActive="mobile-active" class="mobile-nav-item">Contact</a>
            </div>

            <!-- Footer: Support Section -->
            <div class="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
               <p class="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Support & Booking</p>
               <a href="tel:9597371949" class="flex items-center gap-4 group">
                  <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600 transition-colors group-hover:text-brand border border-slate-200">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div class="flex flex-col">
                     <span class="text-xs text-slate-500 font-bold uppercase tracking-tight">Call now</span>
                     <span class="font-black text-slate-900 tracking-tight">+91 95973 71949</span>
                  </div>
               </a>
            </div>
         </div>
      </div>
  `,
  styles: [`
    .nav-link {
      color: rgba(255,255,255,0.7);
      font-weight: 700;
      font-size: 0.813rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.3s ease;
    }
    .nav-link:hover, .active-nav {
      color: #00b1ea;
    }
    .mobile-nav-item {
      padding: 1rem;
      font-weight: 800;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.875rem;
      border-radius: 12px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .mobile-nav-item:hover, .mobile-active {
      background-color: #f1f5f9;
      color: #00b1ea;
    }
    .mobile-sub-item {
      display: block;
      padding: 0.75rem 1rem;
      font-size: 0.813rem;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-left: 2px solid #f1f5f9;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .mobile-sub-item:hover {
      border-left-color: #00b1ea;
      color: #00b1ea;
      background-color: #f8fafc;
    }
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @media (max-width: 350px) {
      .xs-text-13 { font-size: 13px !important; }
    }
  `]
})
export class NavbarComponent {
  @Input() isSplashActive = false;
  
  scrolled = false;
  mobileOpen = false;
  destinationsOpen = false;

  APP_CONFIG = APP_CONFIG;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @HostListener('window:scroll')
  onScroll() {
    if (this.isBrowser) {
      this.scrolled = window.scrollY > 50;
    }
  }

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMenu() {
    this.mobileOpen = false;
    this.destinationsOpen = false;
  }
}
