import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services = [
    { 
      title: 'Honeymoon Trips', 
      tagline: 'Romantic getaways for newlywed couples.', 
      iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      color: 'rose'
    },
    { 
      title: 'Family Trips', 
      tagline: 'Memorable vacations for all generations.', 
      iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'sky'
    },
    { 
      title: 'Student Trips', 
      tagline: 'Educational & fun group exploration.', 
      iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'amber'
    },
    { 
      title: 'College Tours', 
      tagline: 'Inspiring visits to top institutions.', 
      iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      color: 'indigo'
    },
    { 
      title: 'Farewell Trips', 
      tagline: 'Celebrate the end of an iconic chapter.', 
      iconPath: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'purple'
    },
    { 
      title: 'Corporate Tours', 
      tagline: 'Team building in inspiring world locales.', 
      iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'slate'
    },
    { 
      title: 'Adventure Trips', 
      tagline: 'Thrill-seeking journeys for the brave.', 
      iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      color: 'orange'
    },
    { 
      title: 'Pilgrimage Tours', 
      tagline: 'Spiritual journeys to world sacred sites.', 
      iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z',
      color: 'emerald'
    },
    { 
      title: 'Weekend Getaways', 
      tagline: 'Quick escapes from the daily grind.', 
      iconPath: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
      color: 'teal'
    },
    { 
      title: 'Summer Packages', 
      tagline: 'Refresh yourself in cool destinations.', 
      iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'yellow'
    },
    { 
      title: 'Winter Packages', 
      tagline: 'Experience the magic of the fresh snow.', 
      iconPath: 'M8 2v3m4-3v3m4-3v3M3 10h18M3 14h18M3 18h18M7 21a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'cyan'
    },
    { 
      title: 'Group Tours', 
      tagline: 'Meet new people and explore together.', 
      iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'blue'
    },
    { 
      title: 'Customized Tours', 
      tagline: 'Your dream trip, exactly as you want.', 
      iconPath: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
      color: 'violet'
    },
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private initAnimations() {
    // Individual card reveal on scroll
    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.from('.cta-section', {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 95%',
      }
    });

    // Parallax background effect for the page title
    gsap.to('.hero-bg', {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.15,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    // Mouse glow effect
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
}
