import { Component, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav [ngClass]="scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'"
         class="fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-in-out">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">

          <!-- Logo & Title -->
          <div class="flex items-center cursor-pointer" routerLink="/">
            <div class="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-md mr-3">
              U
            </div>
            <span [ngClass]="scrolled ? 'text-slate-900' : 'text-white'"
                  class="font-bold text-lg tracking-tight transition-colors duration-300">
               Unique Tours and Travels
            </span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/"
               [ngClass]="scrolled ? 'text-slate-700 hover:text-sky-600' : 'text-white/90 hover:text-white'"
               class="nav-link font-semibold transition-colors duration-300 relative group">
              Home
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <!-- Tours Dropdown -->
            <div class="relative group cursor-pointer">
              <a [ngClass]="scrolled ? 'text-slate-700 hover:text-sky-600' : 'text-white/90 hover:text-white'"
                 class="nav-link font-semibold transition-colors duration-300 flex items-center relative group">
                Tours
                <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <div class="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 border border-slate-100 overflow-hidden">
                <a routerLink="/explore/domestic" class="block px-5 py-3.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors font-semibold">🇮🇳 Domestic Tours</a>
                <a routerLink="/explore/international" class="block px-5 py-3.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors font-semibold border-t border-slate-50">🌍 International Tours</a>
              </div>
            </div>

            <a routerLink="/explore"
               [ngClass]="scrolled ? 'text-slate-700 hover:text-sky-600' : 'text-white/90 hover:text-white'"
               class="nav-link font-semibold transition-colors duration-300 relative group">
              Explore
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <a routerLink="/about"
               [ngClass]="scrolled ? 'text-slate-700 hover:text-sky-600' : 'text-white/90 hover:text-white'"
               class="nav-link font-semibold transition-colors duration-300 relative group">
              About Us
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <a [href]="'https://wa.me/' + APP_CONFIG.whatsapp" target="_blank"
               class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-xl flex items-center bg-sky-500 text-white hover:bg-sky-600 transform hover:-translate-y-0.5">
               <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Contact Us
            </a>
          </div>

          <!-- Mobile Hamburger -->
          <button (click)="mobileOpen = !mobileOpen" class="md:hidden z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5"
                  [ngClass]="scrolled ? 'text-slate-800' : 'text-white'">
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
      <div class="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
           [ngClass]="mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'"
           (click)="mobileOpen = false"></div>

      <!-- Mobile Menu Panel -->
      <div class="md:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out"
           [ngClass]="mobileOpen ? 'translate-x-0' : 'translate-x-full'">
        <div class="p-8 pt-20 space-y-6">
          <a routerLink="/" (click)="mobileOpen = false"
             class="block text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors">Home</a>
          <a routerLink="/explore/domestic" (click)="mobileOpen = false"
             class="block text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors">Domestic Tours</a>
          <a routerLink="/explore/international" (click)="mobileOpen = false"
             class="block text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors">International Tours</a>
          <a routerLink="/explore" (click)="mobileOpen = false"
             class="block text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors">Explore All</a>
          <a routerLink="/about" (click)="mobileOpen = false"
             class="block text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors">About Us</a>
          <a [href]="'https://wa.me/' + APP_CONFIG.whatsapp" target="_blank"
             class="block mt-4 bg-sky-500 text-white text-center py-3 rounded-xl font-bold hover:bg-sky-600 transition-colors shadow-lg">
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
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isBrowser) {
      this.scrolled = window.scrollY > 80;
    }
  }
}
