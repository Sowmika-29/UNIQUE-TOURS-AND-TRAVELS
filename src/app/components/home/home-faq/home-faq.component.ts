import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-home-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      
      <!-- Decorative Elements -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent"></div>
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="grid lg:grid-cols-3 gap-16">
          
          <!-- Left Column: Header & Context -->
          <div class="lg:col-span-1">
            <div class="sticky top-32">
              <span class="text-sky-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Information Center</span>
              <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Commonly Asked <span class="text-sky-500">Questions</span>
              </h2>
              <p class="text-slate-600 text-lg mb-8 leading-relaxed">
                Everything you need to know about planning your dream vacation with Unique Tours & Travels. 
              </p>
              
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 group hover:shadow-md transition-all">
                <div class="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Still confused?</p>
                  <a routerLink="/contact" class="text-slate-900 font-black hover:text-sky-500 transition-colors">Speak with an Expert</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Accordion -->
          <div class="lg:col-span-2">
            <div class="space-y-4">
              <div *ngFor="let faq of faqs; let i = index" 
                   class="bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500 group"
                   [class.shadow-[0_20px_50px_rgba(0,177,234,0.08)]]="openIndex === i"
                   [class.border-sky-100]="openIndex === i">
                
                <button (click)="toggle(i)"
                        class="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer outline-none">
                  <h3 class="text-lg md:text-xl font-bold transition-colors duration-300 pr-8"
                      [class.text-sky-600]="openIndex === i"
                      [class.text-slate-800]="openIndex !== i">
                    {{ faq.question }}
                  </h3>
                  <div class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                       [class.bg-sky-500]="openIndex === i"
                       [class.bg-slate-50]="openIndex !== i"
                       [class.rotate-180]="openIndex === i"
                       [class.shadow-lg]="openIndex === i"
                       [class.shadow-sky-500/30]="openIndex === i">
                    <svg class="w-5 h-5 transition-colors"
                         [class.text-white]="openIndex === i"
                         [class.text-slate-400]="openIndex !== i"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </button>

                <div class="overflow-hidden transition-all duration-500 ease-in-out"
                     [style.max-height]="openIndex === i ? '500px' : '0'"
                     [style.opacity]="openIndex === i ? '1' : '0'">
                  <div class="px-6 md:px-8 pb-8 md:pb-10">
                    <div class="w-full h-px bg-slate-50 mb-6"></div>
                    <p class="text-slate-600 leading-relaxed text-base md:text-lg" [innerHTML]="faq.answer"></p>
                    
                    <div class="mt-8 flex flex-wrap gap-3">
                      <a routerLink="/contact" class="px-4 py-1.5 bg-sky-50 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest border border-sky-100 hover:bg-sky-500 hover:text-white transition-all">Booking Help</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class HomeFaqComponent implements OnInit {
  openIndex: number | null = 0;
  private seoService = inject(SeoService);

  faqs = [
    {
      question: 'What destinations does Unique Tours & Travels cover?',
      answer: 'We offer tour packages to <strong>50+ destinations</strong> across India and internationally. Our popular domestic packages include <a routerLink="/explore/domestic/kerala" class="text-sky-600 hover:underline font-bold">Kerala</a>, <a routerLink="/explore/domestic/goa" class="text-sky-600 hover:underline font-bold">Goa</a>, <a routerLink="/explore/domestic/manali" class="text-sky-600 hover:underline font-bold">Manali</a>, <a routerLink="/explore/domestic/kashmir" class="text-sky-600 hover:underline font-bold">Kashmir</a>, Rajasthan, Andaman, and Ladakh. For international travel, explore our curated packages for <a routerLink="/explore/international/dubai" class="text-sky-600 hover:underline font-bold">Dubai</a>, <a routerLink="/explore/international/bali" class="text-sky-600 hover:underline font-bold">Bali</a>, Maldives, Thailand, Singapore, Malaysia, and Sri Lanka.'
    },
    {
      question: 'What types of tour packages do you offer?',
      answer: 'We specialize in packages for every occasion — <a routerLink="/explore/domestic" class="text-sky-600 hover:underline font-bold">honeymoon trips</a>, <a routerLink="/explore/domestic" class="text-sky-600 hover:underline font-bold">family vacations</a>, student tours, college trips, corporate retreats, adventure tours, weekend getaways, devotional tours, and fully customized group tours. Each package is tailored to your travel style and budget.'
    },
    {
      question: 'What is included in your tour packages?',
      answer: 'Every package includes <strong>comfortable transport, quality accommodation, sightseeing entry tickets, meals & refreshments, campfire experiences</strong>, and all applicable taxes. We also handle driver allowance, fuel, toll, and parking so you travel worry-free.'
    },
    {
      question: 'How can I book a tour package?',
      answer: 'Booking is easy! Contact us via <strong>WhatsApp at +91 9597371949</strong> or call us directly. You can also fill out the <a routerLink="/contact" class="text-sky-600 hover:underline font-bold">enquiry form</a> on our website. Our travel experts will create a personalized itinerary and share a detailed quote within hours.'
    }
  ];

  ngOnInit() {
    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer.replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags for clean text
        }
      }))
    });
  }

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
