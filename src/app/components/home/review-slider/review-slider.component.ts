import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  isUserAdded?: boolean;
}

@Component({
  selector: 'app-review-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-4 md:py-8 bg-gradient-to-br from-sky-200 via-sky-100 to-sky-200 relative overflow-hidden">

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

      <div class="max-w-[1200px] mx-auto px-4 relative z-10 w-full">

        <div class="relative w-full mb-12 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-0 italic">What Our Travelers Say</h2>
          </div>
          <button (click)="toggleModal()" 
                  class="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-sky-200 transition-all duration-300 transform hover:-translate-y-[calc(50%+4px)] active:scale-95 items-center gap-2 text-sm shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Write a Review
          </button>
        </div>

        <!-- Mobile Review Button -->
        <div class="flex md:hidden justify-center mb-10">
          <button (click)="toggleModal()" 
                  class="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-sky-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Write a Review
          </button>
        </div>

        <div class="relative max-w-6xl mx-auto group/slider">
          <!-- Navigation Arrows -->
          <ng-container *ngIf="showArrows">
            <button (click)="prev()" 
                    class="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-sky-100 text-sky-600 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-sky-500 hover:text-white hover:scale-110 active:scale-95 group/btn">
              <svg class="w-6 h-6 transition-transform group-hover/btn:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button (click)="next()" 
                    class="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-sky-100 text-sky-600 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-sky-500 hover:text-white hover:scale-110 active:scale-95 group/btn">
              <svg class="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </ng-container>

          <div class="overflow-hidden py-10 -mx-4 px-4">
            <div class="flex transition-transform duration-700 ease-in-out"
                 [style.transform]="'translateX(calc(-' + currentIndex * (100 / itemsPerSlide) + '%))'">

              <div *ngFor="let review of reviews" class="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                <div class="bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">

                  <div class="flex mb-4">
                    <svg *ngFor="let s of [1,2,3,4,5]" 
                         [class]="s <= review.rating ? 'text-amber-400' : 'text-slate-200'"
                         class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>

                  <p class="text-slate-600 font-medium text-sm leading-relaxed flex-grow italic">
                    "{{review.comment}}"
                  </p>
                  
                  <div class="text-[10px] text-slate-400 mt-3 font-semibold uppercase tracking-widest">
                    {{review.date}}
                  </div>

                  <div class="flex items-center mt-4 pt-4 border-t border-sky-100">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center font-bold text-base text-white uppercase shadow-lg">
                      {{review.name.charAt(0)}}
                    </div>
                    <div class="ml-3 flex flex-col">
                      <span class="text-slate-800 font-bold text-sm">{{review.name}}</span>
                      <span class="text-sky-500 text-[10px] font-medium">Verified Traveler</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- REVIEW MODAL -->
      <div *ngIf="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" (click)="toggleModal()"></div>
        
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 w-full max-w-lg transform transition-all animate-modal-enter">
          <button (click)="toggleModal()" class="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <h3 class="text-3xl font-bold text-slate-800 mb-2">Share Your Experience</h3>
          <p class="text-slate-500 mb-8">Your feedback helps us make every journey better.</p>

          <form (submit)="submitReview(); $event.preventDefault()" class="space-y-6">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
              <input type="text" [(ngModel)]="newReview.name" name="name" 
                     class="w-full px-5 py-3 rounded-xl border border-sky-100 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all placeholder:text-slate-300"
                     placeholder="Enter your name">
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Your Rating</label>
              <div class="flex gap-2">
                <button *ngFor="let s of [1,2,3,4,5]" 
                        type="button"
                        (mouseover)="hoverRating = s"
                        (mouseleave)="hoverRating = 0"
                        (click)="setRating(s)"
                        class="focus:outline-none transition-transform hover:scale-110">
                  <svg [class]="(hoverRating >= s || newReview.rating >= s) ? 'text-amber-400' : 'text-slate-200'"
                       class="w-10 h-10 fill-current transition-colors" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Your Review</label>
              <textarea [(ngModel)]="newReview.comment" name="comment" rows="4"
                     class="w-full px-5 py-3 rounded-xl border border-sky-100 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all placeholder:text-slate-300 resize-none"
                     placeholder="What did you think of your trip?"></textarea>
            </div>

            <p *ngIf="formError" class="text-rose-500 text-sm font-bold flex items-center gap-1 animate-heading">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              {{formError}}
            </p>

            <button type="submit" 
                    class="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-xl shadow-xl shadow-sky-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
              Submit Review
            </button>
          </form>
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
    @keyframes modal-enter {
      from { opacity: 0; transform: scale(0.9) translateY(20px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
  `]
})
export class ReviewSliderComponent implements OnInit, OnDestroy {
  defaultReviews: Review[] = [
    { 
      name: "Sarah Jenkins", 
      comment: "Absolutely stunning experience! Unique Tours organized everything perfectly. The Kerala backwaters tour was magical!",
      rating: 5,
      date: "March 15, 2026"
    },
    { 
      name: "David Chen", 
      comment: "Very professional team. They handled all the intricacies of our Dubai trip flawlessly. Will book again!",
      rating: 5,
      date: "February 28, 2026"
    },
    { 
      name: "Emily Roberts", 
      comment: "From start to finish, the customer service was phenomenal. Bali was magical and every detail was covered.",
      rating: 5,
      date: "January 10, 2026"
    },
    { 
      name: "Michael Lawson", 
      comment: "The royal tour across Rajasthan was a 10/10. Unique Tours picked the best forts and palaces to visit.",
      rating: 5,
      date: "December 22, 2025"
    },
    { 
      name: "Sophia Martinez", 
      comment: "Our honeymoon in the Maldives was pure perfection. Thank you Unique Tours for making it unforgettable!",
      rating: 5,
      date: "November 05, 2025"
    }
  ];

  reviews: Review[] = [];
  currentIndex = 0;
  itemsPerSlide = 1;

  // Modal State
  showModal = false;
  hoverRating = 0;
  newReview: Review = {
    name: '',
    comment: '',
    rating: 0,
    date: ''
  };
  formError = '';

  private isBrowser: boolean;
  private intervalId: any;
  private resizeHandler = this.updateItemsPerSlide.bind(this);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadReviews();
      this.updateItemsPerSlide();
      window.addEventListener('resize', this.resizeHandler);
      this.startSlideShow();
    }
  }

  loadReviews() {
    const saved = localStorage.getItem('userReviews');
    const userReviews: Review[] = saved ? JSON.parse(saved) : [];
    this.reviews = [...userReviews, ...this.defaultReviews];
  }

  toggleModal() {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newReview = { name: '', comment: '', rating: 0, date: '' };
    this.hoverRating = 0;
    this.formError = '';
  }

  setRating(r: number) {
    this.newReview.rating = r;
  }

  submitReview() {
    if (!this.newReview.name || !this.newReview.comment || this.newReview.rating === 0) {
      this.formError = 'Please fill in all fields and provide a rating.';
      return;
    }

    this.newReview.date = new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    this.newReview.isUserAdded = true;

    // Save to local list
    const saved = localStorage.getItem('userReviews');
    const userReviews: Review[] = saved ? JSON.parse(saved) : [];
    userReviews.unshift({...this.newReview});
    localStorage.setItem('userReviews', JSON.stringify(userReviews));

    // Reload list and show first
    this.loadReviews();
    this.currentIndex = 0;
    this.toggleModal();
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

  get showArrows(): boolean {
    return this.reviews.length > this.itemsPerSlide;
  }

  startSlideShow() { this.intervalId = setInterval(() => this.next(), 4500); }
  stopSlideShow() { if (this.intervalId) clearInterval(this.intervalId); }

  next() {
    this.currentIndex = this.currentIndex < this.reviews.length - this.itemsPerSlide
      ? this.currentIndex + 1 : 0;
    this.stopSlideShow();
    this.startSlideShow();
  }

  prev() {
    this.currentIndex = this.currentIndex > 0
      ? this.currentIndex - 1 
      : Math.max(0, this.reviews.length - this.itemsPerSlide);
    this.stopSlideShow();
    this.startSlideShow();
  }
}
