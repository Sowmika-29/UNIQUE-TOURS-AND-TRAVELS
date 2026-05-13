import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seo-content',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-16 bg-white relative overflow-hidden">

      <!-- Subtle background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-sky-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
          Your Trusted Travel Partner in Tamil Nadu
        </h2>
        <p class="text-slate-600 leading-relaxed mb-6 text-base">
          Unique Tours & Travels has been crafting unforgettable travel experiences since 2017.
          Based in <strong>Karur, Tamil Nadu</strong>, we specialize in affordable domestic and international
          tour packages designed for families, couples, students, and corporate groups. With branches
          in Trichy, Namakkal, and Coimbatore, we serve travelers across South India with personalized
          itineraries and 24/7 customer support.
        </p>

        <h3 class="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
          Popular Domestic Tour Packages
        </h3>
        <p class="text-slate-600 leading-relaxed mb-4 text-base">
          Explore India's most beautiful destinations with our curated domestic packages. Our
          <a routerLink="/destination/domestic/kerala" class="text-sky-600 font-semibold hover:underline">Kerala tour packages</a>
          cover Munnar's tea gardens, Alleppey's backwaters, and Thekkady's wildlife sanctuaries.
          For beach lovers, our
          <a routerLink="/destination/domestic/goa" class="text-sky-600 font-semibold hover:underline">Goa holiday packages</a>
          include visits to Calangute, Baga, and Palolem beaches with premium accommodation.
        </p>
        <p class="text-slate-600 leading-relaxed mb-6 text-base">
          Adventure seekers can choose our
          <a routerLink="/destination/domestic/manali" class="text-sky-600 font-semibold hover:underline">Manali tour packages</a>
          featuring Solang Valley and Rohtang Pass, or explore the pristine beauty of
          <a routerLink="/destination/domestic/jammu-kashmir" class="text-sky-600 font-semibold hover:underline">Kashmir</a>
          with Dal Lake houseboats and Gulmarg skiing. We also offer packages to
          <a routerLink="/destination/domestic/andaman" class="text-sky-600 font-semibold hover:underline">Andaman & Nicobar Islands</a>,
          <a routerLink="/destination/domestic/ladakh" class="text-sky-600 font-semibold hover:underline">Ladakh</a>,
          and <a routerLink="/destination/domestic/jaipur" class="text-sky-600 font-semibold hover:underline">Rajasthan</a>
          for those seeking heritage and culture.
        </p>

        <h3 class="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
          International Tour Packages from India
        </h3>
        <p class="text-slate-600 leading-relaxed mb-6 text-base">
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

        <h3 class="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
          Why Choose Unique Tours & Travels?
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ul class="text-slate-600 leading-relaxed space-y-3 list-none">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>5000+ happy travelers</strong> since 2017</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>50+ destinations</strong> across India and abroad</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Affordable pricing</strong> with no hidden charges</span>
            </li>
          </ul>
          <ul class="text-slate-600 leading-relaxed space-y-3 list-none">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Customizable itineraries</strong> for all group sizes</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>24/7 WhatsApp support</strong> for all bookings</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Experienced team</strong> with trusted drivers</span>
            </li>
          </ul>
        </div>

        <h3 class="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
          Tour Packages for Every Occasion
        </h3>
        <p class="text-slate-600 leading-relaxed mb-4 text-base">
          Whether you're planning a romantic <a routerLink="/services" class="text-sky-600 font-semibold hover:underline">honeymoon trip</a>,
          a fun-filled family vacation, an adventurous college tour, or a professional corporate retreat,
          we have the perfect package for you. Our specialized services include student trips, farewell trips,
          weekend getaways, summer and winter packages, devotional tours, and fully customized group tours.
        </p>
        <p class="text-slate-600 leading-relaxed text-base">
          Every tour includes comfortable transport arrangements, quality accommodation, sightseeing entry tickets,
          food and refreshments, and all taxes — so you can focus on making memories while we handle the logistics.
          <a routerLink="/contact" class="text-sky-600 font-semibold hover:underline">Contact us today</a>
          to plan your dream vacation.
        </p>

      </div>
    </section>
  `
})
export class SeoContentComponent {}
