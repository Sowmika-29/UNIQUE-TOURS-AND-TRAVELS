import { Component } from '@angular/core';
import { APP_CONFIG } from '../../app.config';
import { WhyChooseUsComponent } from "../../components/home/why-choose-us/why-choose-us.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [WhyChooseUsComponent],
  template: `
    <!-- Hero Banner -->
    <div class="relative h-[50vh] min-h-[400px] w-full bg-slate-900 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?fm=webp&fit=crop&w=1920&q=50"
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
    <div class="relative overflow-hidden">

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
            <h2 class="text-4xl font-bold text-slate-800 mb-6">Making Travel Dreams Come True Since 2015</h2>
            <p class="text-slate-600 leading-relaxed mb-4">
              Unique Tours & Travels was born from a simple passion — to help people explore the world's most 
              breathtaking destinations without the hassle. Based in Puliyur, Karur, we've grown from a small 
              local agency into a trusted name for both domestic and international travel.
            </p>
            <p class="text-slate-600 leading-relaxed">
              From the backwaters of Kerala to the skyscrapers of Dubai, we curate every journey with care, 
              ensuring quality accommodation, seamless transport, and memories that last a lifetime.
            </p>
          </div>
          <div class="relative animate-heading" style="animation-delay: 0.2s">
            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=webp&fit=crop&w=1200&q=50"
                 alt="Travel" class="rounded-2xl shadow-2xl w-full h-80 object-cover">
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-500 rounded-2xl -z-10"></div>
          </div>
        </div>

        <!-- Mission / Vision -->
        <div class="grid md:grid-cols-3 gap-8 mb-24">
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-sky-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-heading" style="animation-delay: 0.1s">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center mb-6 shadow-lg">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Our Mission</h3>
            <p class="text-slate-500 leading-relaxed">To make world-class travel accessible and affordable for everyone, with personalized service at every step.</p>
          </div>
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-sky-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-heading" style="animation-delay: 0.2s">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center mb-6 shadow-lg">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Our Vision</h3>
            <p class="text-slate-500 leading-relaxed">To become South India's most loved travel brand, known for trust, quality, and unforgettable experiences.</p>
          </div>
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-sky-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-heading" style="animation-delay: 0.3s">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mb-6 shadow-lg">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Our Values</h3>
            <p class="text-slate-500 leading-relaxed">Transparency, safety, customer satisfaction, and a genuine love for helping people discover new places.</p>
          </div>
        </div>

        <!-- Why Choose Us Section -->
        <div class="mb-24">
          <app-why-choose-us></app-why-choose-us>
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
  `]
})
export class AboutComponent {
  APP_CONFIG = APP_CONFIG;
}
