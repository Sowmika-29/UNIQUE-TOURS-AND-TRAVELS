import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-16 md:py-20 bg-white relative overflow-hidden">

      <!-- Subtle background -->
      <div class="absolute top-0 right-0 w-80 h-80 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-40"></div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div class="text-center mb-12">
          <span class="text-sky-500 font-black tracking-[0.25em] uppercase text-[10px] mb-3 block">Have Questions?</span>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-3">Frequently Asked Questions</h2>
          <div class="w-16 h-1 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div class="space-y-4">
          <div *ngFor="let faq of faqs; let i = index"
               class="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300"
               [class.shadow-md]="openIndex === i"
               [class.border-sky-100]="openIndex === i">

            <button (click)="toggle(i)"
                    class="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer">
              <h3 class="text-base md:text-lg font-bold text-slate-800 pr-4">{{ faq.question }}</h3>
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                   [class.bg-sky-500]="openIndex === i"
                   [class.bg-slate-200]="openIndex !== i"
                   [class.rotate-180]="openIndex === i">
                <svg class="w-4 h-4 transition-colors"
                     [class.text-white]="openIndex === i"
                     [class.text-slate-500]="openIndex !== i"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </button>

            <div *ngIf="openIndex === i" class="px-5 md:px-6 pb-5 md:pb-6">
              <p class="text-slate-600 leading-relaxed text-sm md:text-base" [innerHTML]="faq.answer"></p>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <a routerLink="/contact"
             class="inline-flex items-center gap-2 text-sky-500 font-bold text-sm uppercase tracking-widest hover:text-sky-700 transition-colors">
            Still have questions? Contact us
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>

      </div>
    </section>
  `
})
export class HomeFaqComponent {
  openIndex: number | null = 0;

  faqs = [
    {
      question: 'What destinations does Unique Tours & Travels cover?',
      answer: 'We offer tour packages to <strong>50+ destinations</strong> across India and internationally. Our popular domestic packages include <strong>Kerala, Goa, Manali, Kashmir, Rajasthan, Andaman, and Ladakh</strong>. For international travel, explore our curated packages for <strong>Dubai, Bali, Maldives, Thailand, Singapore, Malaysia, and Sri Lanka</strong>.'
    },
    {
      question: 'What types of tour packages do you offer?',
      answer: 'We specialize in packages for every occasion — <strong>honeymoon trips, family vacations, student tours, college trips, corporate retreats, adventure tours, weekend getaways, devotional tours</strong>, and fully customized group tours. Each package is tailored to your travel style and budget.'
    },
    {
      question: 'What is included in your tour packages?',
      answer: 'Every package includes <strong>comfortable transport, quality accommodation, sightseeing entry tickets, meals & refreshments, campfire experiences</strong>, and all applicable taxes. We also handle driver allowance, fuel, toll, and parking so you travel worry-free.'
    },
    {
      question: 'How can I book a tour package?',
      answer: 'Booking is easy! Contact us via <strong>WhatsApp at +91 9597371949</strong> or call us directly. You can also fill out the enquiry form on our website. Our travel experts will create a personalized itinerary and share a detailed quote within hours.'
    },
    {
      question: 'Where is Unique Tours & Travels located?',
      answer: 'Our main office is at <strong>4B, Ramakrishnapuram Main Road, Karur 639002, Tamil Nadu</strong>. We also have branches in <strong>Trichy, Namakkal, and Coimbatore</strong>. We serve travelers across South India with personalized travel planning and 24/7 customer support.'
    },
    {
      question: 'Why should I choose Unique Tours & Travels?',
      answer: 'With <strong>5000+ happy travelers since 2017</strong>, we are a trusted name in travel. We offer affordable pricing with no hidden charges, 100% customizable itineraries, experienced drivers, and round-the-clock WhatsApp support. Our verified traveler reviews speak for the quality of our journeys.'
    }
  ];

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
