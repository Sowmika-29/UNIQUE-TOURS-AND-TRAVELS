import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Service {
  title: string;
  tagline: string;
  imagePath: string;
  color: string;
  isPopular?: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services = [
    { title: 'Student Trips', slug: 'student-trips', tagline: 'Budget-friendly, Fun & Backpacking', imagePath: 'assets/images/jogini-falls-waterfall-trek.webp', color: 'amber' },
    { title: 'Honeymoon Trips', slug: 'honeymoon-trips', tagline: 'Romantic & Private', imagePath: 'assets/images/maldives-overwater-villas-turquoise.webp', color: 'rose', isPopular: true },
    { title: 'Family Trips', slug: 'family-trips', tagline: 'Safe, Relaxing & Sightseeing', imagePath: 'assets/images/calangute-crowded-beach.webp', color: 'sky' },
    { title: 'College Tours', slug: 'college-tours', tagline: 'Group Activities & Thrills', imagePath: 'assets/images/amer-fort-hilltop-aerial.webp', color: 'indigo' },
    { title: 'Farewell Trips', slug: 'farewell-trips', tagline: 'Memorable Final Getaways', imagePath: 'assets/images/varkala-cliff-beach-aerial.webp', color: 'purple' },
    { title: 'Corporate / Incentive Tours', slug: 'corporate-trips', tagline: 'Luxury & Team Building', imagePath: 'assets/images/dubai-marina-night-skyline.webp', color: 'slate' },
    { title: 'Adventure Trips', slug: 'adventure-trips', tagline: 'Thrilling Experiences', imagePath: 'assets/images/dudhsagar-waterfall-in-forest.webp', color: 'orange', isPopular: true },
    { title: 'Weekend Getaways', slug: 'weekend-getaways', tagline: 'Short & Sweet', imagePath: 'assets/images/lonavala-green-hills-fog.webp', color: 'teal' },
    { title: 'Summer Packages', slug: 'summer-packages', tagline: 'Beat the Heat', imagePath: 'assets/images/alleppey-houseboat-in-backwaters.webp', color: 'yellow' },
    { title: 'Winter Packages', slug: 'winter-packages', tagline: 'Sun & Sand', imagePath: 'assets/images/manali-snow-mountains-valley.webp', color: 'cyan' },
    { title: 'Devotional Tours', slug: 'devotional-tours', tagline: 'Spiritual & Temples', imagePath: 'assets/images/trivandrum-padmanabhaswamy-temple.webp', color: 'emerald' },
    { title: 'Group / Customized Tours', slug: 'customized-tours', tagline: 'Flexible & Versatile', imagePath: 'assets/images/hampi-stone-ruins-chariot.webp', color: 'blue' }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
      this.initTiltCards();
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

  private initTiltCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.05,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
          overwrite: true
        });
      });
    });
  }

  getColorClasses(color: string) {
    const maps: any = {
      rose: 'group-hover:text-rose-600 group-hover:bg-rose-500 group-hover:shadow-rose-500/40',
      sky: 'group-hover:text-sky-600 group-hover:bg-sky-500 group-hover:shadow-sky-500/40',
      amber: 'group-hover:text-amber-600 group-hover:bg-amber-500 group-hover:shadow-amber-500/40',
      indigo: 'group-hover:text-indigo-600 group-hover:bg-indigo-500 group-hover:shadow-indigo-500/40',
      purple: 'group-hover:text-purple-600 group-hover:bg-purple-500 group-hover:shadow-purple-500/40',
      slate: 'group-hover:text-slate-600 group-hover:bg-slate-500 group-hover:shadow-slate-500/40',
      orange: 'group-hover:text-orange-600 group-hover:bg-orange-500 group-hover:shadow-orange-500/40',
      emerald: 'group-hover:text-emerald-600 group-hover:bg-emerald-500 group-hover:shadow-emerald-500/40',
      teal: 'group-hover:text-teal-600 group-hover:bg-teal-500 group-hover:shadow-teal-500/40',
      yellow: 'group-hover:text-yellow-600 group-hover:bg-yellow-500 group-hover:shadow-yellow-500/40',
      cyan: 'group-hover:text-cyan-600 group-hover:bg-cyan-500 group-hover:shadow-cyan-500/40',
      blue: 'group-hover:text-blue-600 group-hover:bg-blue-500 group-hover:shadow-blue-500/40',
      violet: 'group-hover:text-violet-600 group-hover:bg-violet-500 group-hover:shadow-violet-500/40',
    };
    return maps[color] || maps.sky;
  }
}
