import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../app.config';
import { SeoService } from '../../services/seo.service';
import { WhyChooseUsComponent } from "../../components/home/why-choose-us/why-choose-us.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [WhyChooseUsComponent, RouterLink],
  template: `
    <!-- Hero Banner -->
    <div class="relative h-[50vh] min-h-[400px] w-full bg-slate-900 overflow-hidden">
      <img src="/assets/images/Bask Underwater.webp"
           alt="About Us" class="absolute inset-0 w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

      <!-- Hero particles -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        <div class="about-particle ap-1"></div>
        <div class="about-particle ap-2"></div>
        <div class="about-particle ap-3"></div>
        <div class="about-particle ap-4"></div>
        <div class="about-particle ap-5"></div>
        <div class="about-particle ap-6"></div>
      </div>

      <div class="absolute inset-0 flex items-center justify-center z-20">
        <div class="text-center px-4 animate-heading">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl">About Us</h1>
          <p class="text-xl text-slate-300 max-w-2xl mx-auto">Your trusted partner for unforgettable travel experiences</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative overflow-hidden bg-slate-50">

      <!-- Animated background for content area -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="content-orb co-1"></div>
        <div class="content-orb co-2"></div>
        <div class="content-spin cs-1"></div>
        <div class="content-spin cs-2"></div>
        <div class="content-rise cr-1"></div>
        <div class="content-rise cr-2"></div>
        <div class="content-rise cr-3"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4 relative z-10">

        <!-- Our Story -->
        <div class="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div class="animate-heading">
            <span class="text-sky-500 font-bold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
            <h2 class="text-4xl font-bold text-slate-800 mb-6">Making Travel Dreams Come True Since 2017</h2>
            <p class="text-slate-600 leading-relaxed mb-4">
              Unique Tours & Travels was born from a simple passion — to help people explore the world's most 
              breathtaking destinations without the hassle. Based in Karur, we've grown from a small 
              local agency into a trusted name for both domestic and international travel.
            </p>
            <p class="text-slate-600 leading-relaxed">
              From the backwaters of Kerala to the skyscrapers of Dubai, we curate every journey with care, 
              ensuring quality accommodation, seamless transport, and memories that last a lifetime.
            </p>
          </div>
          <div class="relative animate-heading" style="animation-delay: 0.2s">
            <img src="/assets/images/hero-section1.webp"
                 alt="Travel" class="rounded-2xl shadow-2xl w-full h-80 object-cover">
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-500 rounded-2xl -z-10"></div>
          </div>
        </div>

        <!-- Mission / Vision / Values - Redesigned with custom CSS -->
        <div class="grid md:grid-cols-3 gap-12 md:gap-10 mb-32 relative mt-8">
          
          <!-- Mission Card -->
          <div class="mission-container animate-heading" style="animation-delay: 0.1s; margin: 20px auto;">
            <h3 class="mission-title text-xl uppercase font-black">Our Mission</h3>
            <p class="text-slate-600 leading-relaxed font-semibold text-base italic mt-4">"To make world-class travel accessible and affordable for everyone, with personalized service at every step of your journey."</p>
          </div>

          <!-- Vision Card -->
          <div class="mission-container animate-heading" style="animation-delay: 0.2s; margin: 20px auto;">
            <h3 class="mission-title text-xl uppercase font-black">Our Vision</h3>
            <p class="text-slate-600 leading-relaxed font-semibold text-base italic mt-4">"To become South India's most loved travel brand, recognized for absolute trust, elite quality, and unforgettable memories."</p>
          </div>

          <!-- Values Card -->
          <div class="mission-container animate-heading" style="animation-delay: 0.3s; margin: 20px auto;">
            <h3 class="mission-title text-xl uppercase font-black">Our Values</h3>
            <p class="text-slate-600 leading-relaxed font-semibold text-base italic mt-4">"Transparency, safety, and a deep-rooted passion for helping people discover the hidden gems of our world."</p>
          </div>
        </div>

        <!-- Why Choose Us Section -->
        <div class="mb-24">
          <app-why-choose-us></app-why-choose-us>
        </div>

        <!-- ═══════════ OUR TOUR PACKAGES ═══════════ -->
        <div class="mb-28">
          <div class="text-center mb-14 animate-heading">
            <span class="text-sky-500 font-black tracking-[0.25em] uppercase text-[10px] mb-3 block">Our Tour Packages</span>
            <h2 class="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">Destinations We Cover</h2>
            <div class="w-20 h-1.5 bg-sky-500 mx-auto rounded-full shadow-lg shadow-sky-200"></div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">

            <!-- Domestic Card -->
            <div class="group bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div class="relative h-3 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600">
                <div class="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              </div>
              <div class="p-8 md:p-10">
                <div class="flex items-center gap-4 mb-6">
                  <div>
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight">Domestic Tours</h3>
                    <p class="text-xs font-bold text-sky-500 uppercase tracking-widest">Explore India</p>
                  </div>
                </div>
                <p class="text-slate-600 leading-relaxed mb-4">
                  Explore India's most beautiful destinations with our curated domestic packages. Our 
                  <a routerLink="/destination/domestic/kerala" class="text-sky-600 font-semibold hover:underline">Kerala tour packages</a>
                  cover Munnar's tea gardens, Alleppey's backwaters, and Thekkady's wildlife sanctuaries. 
                  For beach lovers, our 
                  <a routerLink="/destination/domestic/goa" class="text-sky-600 font-semibold hover:underline">Goa holiday packages</a>
                  include visits to Calangute, Baga, and Palolem beaches with premium accommodation.
                </p>
                <p class="text-slate-600 leading-relaxed mb-6">
                  Adventure seekers can choose our 
                  <a routerLink="/destination/domestic/manali" class="text-sky-600 font-semibold hover:underline">Manali tour packages</a>
                  featuring Solang Valley and Rohtang Pass, or explore the pristine beauty of 
                  <a routerLink="/destination/domestic/jammu-kashmir" class="text-sky-600 font-semibold hover:underline">Kashmir</a>
                  with Dal Lake houseboats and Gulmarg skiing. We also offer packages to 
                  <a routerLink="/destination/domestic/andaman" class="text-sky-600 font-semibold hover:underline">Andaman & Nicobar Islands</a>,
                  <a routerLink="/destination/domestic/ladakh" class="text-sky-600 font-semibold hover:underline">Ladakh</a>, and 
                  <a routerLink="/destination/domestic/jaipur" class="text-sky-600 font-semibold hover:underline">Rajasthan</a>
                  for those seeking heritage and culture.
                </p>
                <a routerLink="/explore/domestic" class="inline-flex items-center gap-2 text-sky-500 font-bold text-sm uppercase tracking-widest hover:text-sky-700 transition-colors group/link">
                  View Domestic Packages
                  <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </div>
            </div>

            <!-- International Card -->
            <div class="group bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div class="relative h-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              </div>
              <div class="p-8 md:p-10">
                <div class="flex items-center gap-4 mb-6">
                  <div>
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight">International Tours</h3>
                    <p class="text-xs font-bold text-indigo-500 uppercase tracking-widest">Explore the World</p>
                  </div>
                </div>
                <p class="text-slate-600 leading-relaxed mb-6">
                  Dream of international destinations? Our 
                  <a routerLink="/destination/international/dubai" class="text-sky-600 font-semibold hover:underline">Dubai tour packages</a>
                  include Burj Khalifa visits, desert safaris, and city tours. For tropical getaways, choose from our 
                  <a routerLink="/destination/international/bali" class="text-sky-600 font-semibold hover:underline">Bali</a>,
                  <a routerLink="/destination/international/maldives" class="text-sky-600 font-semibold hover:underline">Maldives</a>, or 
                  <a routerLink="/destination/international/thailand" class="text-sky-600 font-semibold hover:underline">Thailand packages</a>.
                  We also offer curated tours to 
                  <a routerLink="/destination/international/singapore" class="text-sky-600 font-semibold hover:underline">Singapore</a>,
                  <a routerLink="/destination/international/malaysia" class="text-sky-600 font-semibold hover:underline">Malaysia</a>, and 
                  <a routerLink="/destination/international/sri-lanka" class="text-sky-600 font-semibold hover:underline">Sri Lanka</a>
                  with all-inclusive pricing and hassle-free visa assistance.
                </p>
                <a routerLink="/explore/international" class="inline-flex items-center gap-2 text-indigo-500 font-bold text-sm uppercase tracking-widest hover:text-indigo-700 transition-colors group/link">
                  View International Packages
                  <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════ EVERY OCCASION ═══════════ -->
        <div class="mb-28">
          <div class="text-center mb-14 animate-heading">
            <span class="text-sky-500 font-black tracking-[0.25em] uppercase text-[10px] mb-3 block">Tailored For You</span>
            <h2 class="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">Tour Packages for Every Occasion</h2>
            <div class="w-20 h-1.5 bg-sky-500 mx-auto rounded-full shadow-lg shadow-sky-200"></div>
          </div>

          <div class="bg-white rounded-3xl border border-slate-100 shadow-md p-8 md:p-12 mb-10">
            <div class="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p class="text-slate-600 leading-relaxed mb-5 text-base">
                  Whether you're planning a romantic 
                  <a routerLink="/services" class="text-sky-600 font-semibold hover:underline">honeymoon trip</a>, 
                  a fun-filled family vacation, an adventurous college tour, or a professional corporate retreat, 
                  we have the perfect package for you.
                </p>
                <p class="text-slate-600 leading-relaxed text-base">
                  Our specialized services include student trips, farewell trips, weekend getaways, 
                  summer and winter packages, devotional tours, and fully customized group tours.
                </p>
              </div>
              <div class="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                <h4 class="font-black text-slate-800 uppercase tracking-widest text-xs mb-5">Every Package Includes</h4>
                <ul class="space-y-3">
                  <li class="flex items-center gap-3 text-slate-600 text-sm">
                    <span class="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0"></span>
                    Comfortable transport arrangements
                  </li>
                  <li class="flex items-center gap-3 text-slate-600 text-sm">
                    <span class="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0"></span>
                    Quality accommodation
                  </li>
                  <li class="flex items-center gap-3 text-slate-600 text-sm">
                    <span class="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0"></span>
                    Sightseeing entry tickets
                  </li>
                  <li class="flex items-center gap-3 text-slate-600 text-sm">
                    <span class="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0"></span>
                    Food & refreshments
                  </li>
                  <li class="flex items-center gap-3 text-slate-600 text-sm">
                    <span class="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0"></span>
                    All taxes included
                  </li>
                </ul>
              </div>
            </div>
          </div>


        <!-- CTA -->
        <div class="text-center bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-12 shadow-2xl text-white animate-heading relative overflow-hidden">
          <!-- CTA animated bg -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="cta-wave cw-1"></div>
            <div class="cta-wave cw-2"></div>
          </div>
          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p class="text-white/90 mb-8 text-lg max-w-xl mx-auto">Get in touch with our travel experts and let us create the perfect itinerary for you.</p>
            <a [href]="'https://wa.me/' + APP_CONFIG.whatsapp" target="_blank"
               class="inline-block bg-white text-sky-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl">
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .mission-container {
      position: relative;
      border: 3px solid #1e88c9;
      padding: 40px;
      max-width: 600px;
      background: white;
      height: 100%;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      transition: all 0.3s;
    }
    .mission-container:hover {
      box-shadow: 0 10px 30px rgba(30,136,201,0.15);
    }
    .mission-title {
      position: absolute;
      top: -14px;
      left: 20px;
      background: #f8fafc;
      padding: 0 10px;
      color: #1e88c9;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .about-particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      bottom: 0;
      animation: rise-up linear infinite;
      box-shadow: 0 0 6px rgba(255,255,255,0.2);
    }
    .ap-1 { width: 8px;  height: 8px;  left: 8%;  animation-duration: 9s; }
    .ap-2 { width: 12px; height: 12px; left: 25%; animation-duration: 13s; animation-delay: 2s; }
    .ap-3 { width: 6px;  height: 6px;  left: 45%; animation-duration: 10s; animation-delay: 4s; }
    .ap-4 { width: 10px; height: 10px; left: 65%; animation-duration: 12s; animation-delay: 1s; }
    .ap-5 { width: 8px;  height: 8px;  left: 82%; animation-duration: 11s; animation-delay: 3s; }
    .ap-6 { width: 14px; height: 14px; left: 95%; animation-duration: 15s; animation-delay: 5s; }

    .content-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
    }
    .co-1 {
      width: 350px; height: 350px;
      background: rgba(56, 189, 248, 0.2);
      top: 5%; right: -80px;
      animation: orb-move 20s ease-in-out infinite;
    }
    .co-2 {
      width: 280px; height: 280px;
      background: rgba(14, 165, 233, 0.15);
      bottom: 15%; left: -60px;
      animation: orb-move 25s ease-in-out infinite 6s;
    }

    .content-spin {
      position: absolute;
      border: 3px solid rgba(56, 189, 248, 0.3);
      border-radius: 8px;
      animation: spin-3d linear infinite;
    }
    .cs-1 { width: 40px; height: 40px; top: 20%; left: 3%; animation-duration: 14s; }
    .cs-2 { width: 30px; height: 30px; bottom: 30%; right: 3%; animation-duration: 18s; animation-direction: reverse; }

    .content-rise {
      position: absolute;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.4);
      bottom: 0;
      animation: rise-up linear infinite;
    }
    .cr-1 { width: 10px; height: 10px; left: 20%; animation-duration: 10s; }
    .cr-2 { width: 12px; height: 12px; left: 55%; animation-duration: 13s; animation-delay: 3s; }
    .cr-3 { width: 8px;  height: 8px;  left: 85%; animation-duration: 9s;  animation-delay: 5s; }

    .cta-wave {
      position: absolute;
      width: 200%;
      height: 200%;
      border-radius: 40%;
      background: rgba(255,255,255,0.06);
    }
    .cw-1 {
      top: -140%; left: -50%;
      animation: cta-rotate 20s linear infinite;
    }
    .cw-2 {
      top: -150%; left: -30%;
      animation: cta-rotate 25s linear infinite reverse;
    }

    @keyframes rise-up {
      0%   { transform: translateY(0); opacity: 0; }
      10%  { opacity: 0.8; }
      85%  { opacity: 0.3; }
      100% { transform: translateY(-800px); opacity: 0; }
    }
    @keyframes orb-move {
      0%, 100% { transform: translate(0,0) scale(1); }
      33% { transform: translate(40px,-30px) scale(1.1); }
      66% { transform: translate(-25px,35px) scale(0.95); }
    }
    @keyframes spin-3d {
      0%   { transform: perspective(300px) rotateX(0deg) rotateY(0deg); }
      100% { transform: perspective(300px) rotateX(360deg) rotateY(360deg); }
    }
    @keyframes cta-rotate {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-30px) scale(1.05); }
    }
    .animate-float {
      animation: float 8s ease-in-out infinite;
    }
  `]
})
export class AboutComponent implements OnInit {
  APP_CONFIG = APP_CONFIG;

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'About Us - Trusted Travel Agency',
      description: 'Unique Tours & Travels — trusted travel agency in Karur, Tamil Nadu since 2017. Affordable domestic & international tour packages for families, couples, students & corporates.',
      keywords: 'travel agency Karur, tour operator Tamil Nadu, domestic tours, international packages, Kerala tours, Goa packages, Dubai trips, honeymoon packages',
      url: '/about',
      type: 'website'
    });
  }
}
