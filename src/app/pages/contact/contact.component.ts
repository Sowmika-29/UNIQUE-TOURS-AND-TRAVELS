import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryFormComponent } from '../../components/shared/enquiry-form/enquiry-form.component';
import { SeoService } from '../../services/seo.service';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, EnquiryFormComponent],
  template: `
    <div class="pt-24 min-h-screen bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        <div class="text-center mb-16">
          <span class="text-sky-500 font-black tracking-[0.25em] uppercase text-[10px] mb-3 block">Get In Touch</span>
          <h1 class="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mb-4">Contact Us</h1>
          <p class="text-slate-600 text-lg max-w-2xl mx-auto">Have a destination in mind? Or need help planning your next journey? We're here for you 24/7.</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
          
          <!-- Contact Information -->
          <div class="space-y-8 animate-heading">
            
            <div class="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
              <h2 class="text-2xl font-black text-slate-800 mb-8">Our Offices</h2>
              
              <div class="space-y-10">
                <!-- Main Office -->
                <div class="flex gap-6">
                  <div class="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center flex-shrink-0 text-sky-500">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-black text-slate-800 mb-1">Main Office: Karur</h3>
                    <address class="not-italic text-slate-600 leading-relaxed">
                      4B, Ramakrishnapuram Main Road,<br>
                      Opposite Stationery Shop,<br>
                      Karur – 639002, Tamil Nadu
                    </address>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex gap-6">
                  <div class="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 text-green-500">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-black text-slate-800 mb-1">Call / WhatsApp</h3>
                    <address class="not-italic flex flex-col gap-1">
                      <a href="tel:+919597371949" class="text-slate-600 hover:text-sky-500 font-bold transition-colors">+91 95973 71949</a>
                      <a href="tel:+919524712976" class="text-slate-600 hover:text-sky-500 font-bold transition-colors">+91 95247 12976</a>
                    </address>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex gap-6">
                  <div class="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-500">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-black text-slate-800 mb-1">Email Support</h3>
                    <address class="not-italic">
                      <a href="mailto:uniquetours.packager@gmail.com" class="text-slate-600 hover:text-sky-500 font-bold transition-colors">uniquetours.packager&#64;gmail.com</a>
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <!-- Branch List -->
            <div class="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 class="text-xl font-bold mb-6">Our Other Branches</h3>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span class="block font-bold">Trichy</span>
                </div>
                <div class="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span class="block font-bold">Namakkal</span>
                </div>
                <div class="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span class="block font-bold">Coimbatore</span>
                </div>
              </div>
            </div>

            <!-- Map Embed (Simplified placeholder) -->
            <div class="rounded-3xl overflow-hidden shadow-md h-64 border border-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.472714285714!2d78.0769!3d10.9576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU3JzI3LjQiTiA3OMKwMDQnMzYuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>

          </div>

          <!-- Enquiry Form -->
          <div class="animate-heading" style="animation-delay: 0.2s">
            <app-enquiry-form [isFullPage]="true"></app-enquiry-form>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ContactComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Contact Us | Reach Unique Tours & Travels',
      description: 'Contact Unique Tours & Travels in Karur, Tamil Nadu. Call +91 95973 71949 or visit our office at Ramakrishnapuram Main Road for custom tour bookings.',
      url: '/contact',
      type: 'website'
    });

    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "TravelAgency",
        "name": "Unique Tours & Travels",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4B, Ramakrishnapuram Main Road, Opposite Stationery Shop",
          "addressLocality": "Karur",
          "addressRegion": "Tamil Nadu",
          "postalCode": "639002",
          "addressCountry": "IN"
        },
        "telephone": "+919597371949",
        "email": "uniquetours.packager@gmail.com"
      }
    });
  }
}
