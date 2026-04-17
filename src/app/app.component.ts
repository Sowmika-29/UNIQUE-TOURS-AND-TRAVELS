import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EnquiryFormComponent } from './components/shared/enquiry-form/enquiry-form.component';
import { FloatingAssistantComponent } from './components/shared/floating-assistant/floating-assistant.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, EnquiryFormComponent, FloatingAssistantComponent, CommonModule], 
  template: `
    <!-- Video Splash Screen Overlay -->
    <div *ngIf="showSplash" 
         class="fixed inset-0 z-[9999] bg-white transition-opacity duration-1000 flex items-center justify-center p-4" 
         [ngClass]="{'opacity-0 pointer-events-none': fadeSplash}">
      <video #splashVideo class="w-64 md:w-80 max-w-full drop-shadow-sm h-auto object-contain" autoplay muted playsinline (ended)="onSplashComplete()">
        <source src="assets/Splash%20screen/Splash-screen.mp4" type="video/mp4">
      </video>
      <button (click)="onSplashComplete()" class="absolute z-[10000] bottom-10 right-10 bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-sm border border-slate-300">
        Skip 
      </button>
    </div>

    <div class="min-h-screen flex flex-col">
      <app-navbar [isSplashActive]="!fadeSplash"></app-navbar>
      
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <!-- Global Enquiry Form (Hidden on Contact page to avoid duplication) -->
      <app-enquiry-form *ngIf="!isContactPage"></app-enquiry-form>

      <app-footer></app-footer>

      <!-- Global AI Assistant & WhatsApp -->
      <app-floating-assistant [isVisible]="fadeSplash"></app-floating-assistant>
    </div>
  `
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'unique-tours';
  isContactPage = false;
  showSplash = true;
  fadeSplash = false;

  @ViewChild('splashVideo') splashVideo!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isContactPage = event.urlAfterRedirects.includes('/contact');
    });
  }

  ngOnInit() {
    // Failsafe in case video doesn't play or end properly
    setTimeout(() => {
      if (this.showSplash) {
        this.onSplashComplete();
      }
    }, 15000); 
  }

  ngAfterViewInit() {
    // Explicitly enforce autoplay once component mounts to bypass strict browser policies
    if (this.splashVideo && this.splashVideo.nativeElement) {
      this.splashVideo.nativeElement.muted = true;
      this.splashVideo.nativeElement.play().catch(e => console.warn('Autoplay prevented by browser:', e));
    }
  }

  onSplashComplete() {
    this.fadeSplash = true;
    setTimeout(() => {
      this.showSplash = false;
    }, 1000); // Wait for transition to finish
  }
}
