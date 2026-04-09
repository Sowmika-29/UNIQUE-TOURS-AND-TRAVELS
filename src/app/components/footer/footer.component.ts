import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
<footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20 pb-8 relative overflow-hidden">

  <!-- Decorative circles -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">

    <div class="grid md:grid-cols-3 gap-12 mb-16">

      <!-- Brand -->
      <div>
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl shadow-lg mr-3">U</div>
          <h2 class="text-2xl font-bold tracking-tight">Unique Tours & Travels</h2>
        </div>
        <p class="text-slate-400 leading-relaxed mb-6">
          Discover curated travel experiences across domestic and international destinations. Your journey begins here.
        </p>
        <button (click)="openWhatsApp()"
          class="bg-sky-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-sky-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-sky-500/25 flex items-center w-fit">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat on WhatsApp
        </button>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-bold mb-6 text-sky-400">Quick Links</h3>
        <ul class="space-y-3">
          <li><a routerLink="/" class="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Home</a></li>
          <li><a routerLink="/explore" class="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Explore</a></li>
          <li><a routerLink="/explore/domestic" class="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Domestic Tours</a></li>
          <li><a routerLink="/explore/international" class="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">International Tours</a></li>
          <li><a routerLink="/about" class="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">About Us</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-lg font-bold mb-6 text-sky-400">Contact Us</h3>
        <div class="space-y-4 text-slate-400">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-sky-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Teachers Colony, Trichy Main Road<br>Puliyur - 639114, Karur</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-sky-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <a href="mailto:uniquetravels407@gmail.com" class="hover:text-sky-400 transition-colors">uniquetravels407&#64;gmail.com</a>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-sky-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <span>9597371949 / 9524712976</span>
          </div>
        </div>

        <!-- Social Icons -->
        <div class="flex space-x-4 mt-8">
          <a href="#" class="w-10 h-10 rounded-full bg-slate-700 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/25">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-slate-700 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/25">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z"/></svg>
          </a>
        </div>
      </div>

    </div>

    <div class="border-t border-slate-700/50 pt-6 text-center text-sm text-slate-500">
      © 2026 Unique Tours & Travels. All rights reserved.
    </div>

  </div>

</footer>
`
})
export class FooterComponent {
  APP_CONFIG = APP_CONFIG;

  openWhatsApp() {
    window.open('https://wa.me/' + APP_CONFIG.whatsapp, '_blank');
  }
}
