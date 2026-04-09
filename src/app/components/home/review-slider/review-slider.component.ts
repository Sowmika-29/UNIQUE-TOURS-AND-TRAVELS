import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-review-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-gradient-to-br from-sky-200 via-sky-100 to-sky-200 relative overflow-hidden">

      <!-- Animated Background -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="glow glow-1"></div>
        <div class="glow glow-2"></div>

        <div class="orbit-ring ring-1">
          <div class="orbit-dot"></div>
        </div>
        <div class="orbit-ring ring-2">
          <div class="orbit-dot"></div>
        </div>

        <div class="float-shape fs-1"></div>
        <div class="float-shape fs-2"></div>
        <div class="float-shape fs-3"></div>

        <div class="sparkle sp-1"></div>
        <div class="sparkle sp-2"></div>
        <div class="sparkle sp-3"></div>
        <div class="sparkle sp-4"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        <div class="text-center mb-16">
          <span class="text-sky-500 font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight animate-heading">What Our Travelers Say</h2>
        </div>

        <div class="relative max-w-6xl mx-auto">
          <div class="overflow-hidden py-10 -mx-4 px-4">
            <div class="flex transition-transform duration-700 ease-in-out"
                 [style.transform]="'translateX(calc(-' + currentIndex * (100 / itemsPerSlide) + '%))'">

              <div *ngFor="let review of reviews" class="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                <div class="bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">

                  <div class="flex text-amber-400 mb-6">
                    <svg *ngFor="let s of [1,2,3,4,5]" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>

                  <p class="text-slate-600 font-medium text-base leading-relaxed flex-grow italic">
                    "{{review.text}}"
                  </p>

                  <div class="flex items-center mt-6 pt-6 border-t border-sky-100">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center font-bold text-lg text-white uppercase shadow-lg">
                      {{review.name.charAt(0)}}
                    </div>
                    <div class="ml-4 flex flex-col">
                      <span class="text-slate-800 font-bold text-base">{{review.name}}</span>
                      <span class="text-sky-500 text-xs font-medium">Verified Traveler</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
    }
    .glow-1 {
      width: 350px; height: 350px;
      background: rgba(56, 189, 248, 0.3);
      top: -80px; right: -60px;
      animation: glow-drift 15s ease-in-out infinite;
    }
    .glow-2 {
      width: 300px; height: 300px;
      background: rgba(14, 165, 233, 0.25);
      bottom: -60px; left: -40px;
      animation: glow-drift 20s ease-in-out infinite 4s;
    }

    .orbit-ring {
      position: absolute;
      border: 2px dashed rgba(56, 189, 248, 0.15);
      border-radius: 50%;
      animation: ring-spin linear infinite;
    }
    .ring-1 {
      width: 200px; height: 200px;
      top: 15%; left: 10%;
      animation-duration: 20s;
    }
    .ring-2 {
      width: 160px; height: 160px;
      bottom: 10%; right: 8%;
      animation-duration: 25s;
      animation-direction: reverse;
    }
    .orbit-dot {
      position: absolute;
      width: 14px; height: 14px;
      background: rgba(56, 189, 248, 0.5);
      border-radius: 50%;
      top: -7px; left: 50%;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
    }

    .float-shape {
      position: absolute;
      border: 3px solid rgba(56, 189, 248, 0.35);
      animation: float-rotate linear infinite;
    }
    .fs-1 { width: 45px; height: 45px; border-radius: 10px; top: 20%; right: 20%; animation-duration: 12s; }
    .fs-2 { width: 30px; height: 30px; border-radius: 50%; bottom: 25%; left: 15%; animation-duration: 16s; }
    .fs-3 { width: 20px; height: 20px; border-radius: 4px; top: 60%; right: 5%;  animation-duration: 10s; animation-direction: reverse; }

    .sparkle {
      position: absolute;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.5);
      bottom: 0;
      animation: sparkle-rise linear infinite;
    }
    .sp-1 { width: 8px;  height: 8px;  left: 20%; animation-duration: 7s; }
    .sp-2 { width: 12px; height: 12px; left: 45%; animation-duration: 9s; animation-delay: 2s; }
    .sp-3 { width: 6px;  height: 6px;  left: 65%; animation-duration: 8s; animation-delay: 4s; }
    .sp-4 { width: 10px; height: 10px; left: 85%; animation-duration: 10s; animation-delay: 1s; }

    @keyframes glow-drift {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(40px, -30px) scale(1.1); }
      66% { transform: translate(-30px, 40px) scale(0.95); }
    }
    @keyframes ring-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes float-rotate {
      0%   { transform: perspective(300px) rotateX(0deg) rotateY(0deg) translateY(0); }
      50%  { transform: perspective(300px) rotateX(180deg) rotateY(180deg) translateY(-20px); }
      100% { transform: perspective(300px) rotateX(360deg) rotateY(360deg) translateY(0); }
    }
    @keyframes sparkle-rise {
      0%   { transform: translateY(0); opacity: 0; }
      15%  { opacity: 0.8; }
      85%  { opacity: 0.3; }
      100% { transform: translateY(-600px); opacity: 0; }
    }
  `]
})
export class ReviewSliderComponent implements OnInit, OnDestroy {
  reviews = [
    { name: "Sarah Jenkins", text: "Absolutely stunning experience! Unique Tours organized everything perfectly. The Kerala backwaters tour was magical!" },
    { name: "David Chen", text: "Very professional team. They handled all the intricacies of our Dubai trip flawlessly. Will book again!" },
    { name: "Emily Roberts", text: "From start to finish, the customer service was phenomenal. Bali was magical and every detail was covered." },
    { name: "Michael Lawson", text: "The royal tour across Rajasthan was a 10/10. Unique Tours picked the best forts and palaces to visit." },
    { name: "Sophia Martinez", text: "Our honeymoon in the Maldives was pure perfection. Thank you Unique Tours for making it unforgettable!" }
  ];

  currentIndex = 0;
  itemsPerSlide = 1;
  private isBrowser: boolean;
  private intervalId: any;
  private resizeHandler = this.updateItemsPerSlide.bind(this);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.updateItemsPerSlide();
      window.addEventListener('resize', this.resizeHandler);
      this.startSlideShow();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.resizeHandler);
      this.stopSlideShow();
    }
  }

  updateItemsPerSlide() {
    if (window.innerWidth >= 1024) this.itemsPerSlide = 3;
    else if (window.innerWidth >= 640) this.itemsPerSlide = 2;
    else this.itemsPerSlide = 1;
    if (this.currentIndex > this.reviews.length - this.itemsPerSlide)
      this.currentIndex = Math.max(0, this.reviews.length - this.itemsPerSlide);
  }

  startSlideShow() { this.intervalId = setInterval(() => this.next(), 4500); }
  stopSlideShow() { if (this.intervalId) clearInterval(this.intervalId); }

  next() {
    this.currentIndex = this.currentIndex < this.reviews.length - this.itemsPerSlide
      ? this.currentIndex + 1 : 0;
    this.stopSlideShow();
    this.startSlideShow();
  }
}
