import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { HeroSliderComponent } from '../../components/home/hero-slider/hero-slider.component';
import { CategoryCardsComponent } from '../../components/home/category-cards/category-cards.component';
import { TopDestinationsComponent } from '../../components/home/top-destinations/top-destinations.component';
import { ReviewSliderComponent } from '../../components/home/review-slider/review-slider.component';
import { StatsCounterComponent } from '../../components/home/stats-counter/stats-counter.component';
import { HomeFaqComponent } from '../../components/home/home-faq/home-faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSliderComponent, 
    CategoryCardsComponent, 
    TopDestinationsComponent, 
    StatsCounterComponent,
    ReviewSliderComponent,
    HomeFaqComponent

  ],
  template: `
    <app-hero-slider></app-hero-slider>
    <app-category-cards></app-category-cards>
    <app-top-destinations></app-top-destinations>
    <app-stats-counter></app-stats-counter>
    <app-review-slider></app-review-slider>
    <app-home-faq></app-home-faq>

  `
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Explore Tour Packages India',
      description: 'Explore 50+ destinations with affordable tour packages for Kerala, Goa, Kashmir, Dubai, Bali & more. Trusted by 5000+ travelers. Book now!',
      keywords: 'tour packages India, travel agency Karur, Kerala tours, Goa packages, Dubai trips, Bali holidays, honeymoon packages, family tours',
      url: '/',
      type: 'website'
    });

    // TravelAgency Schema (Local SEO)
    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Unique Tours & Travels",
      "description": "Trusted travel agency offering affordable domestic and international tour packages since 2017. Based in Karur, Tamil Nadu.",
      "url": "https://uniquetours.in",
      "telephone": ["+919597371949", "+919524712976"],
      "email": "uniquetours.packager@gmail.com",
      "foundingDate": "2017",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4B, Ramakrishnapuram Main Road, Opposite Stationery Shop",
        "addressLocality": "Karur",
        "addressRegion": "Tamil Nadu",
        "postalCode": "639002",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.9601",
        "longitude": "78.0766"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://www.facebook.com/share/17BVAzqE3y/",
        "https://www.instagram.com/unique.tourisam"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5"
      }
    }, 'schema-travel-agency');

    // FAQ Schema (enables FAQ rich results in Google)
    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What tour packages does Unique Tours & Travels offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer domestic packages (Kerala, Goa, Manali, Kashmir, Rajasthan, Andaman) and international packages (Dubai, Bali, Maldives, Singapore, Thailand, Malaysia, Sri Lanka). We specialize in student trips, honeymoon packages, family tours, and corporate tours."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Unique Tours & Travels located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our main office is at 4B Ramakrishnapuram Main Road, Karur 639002, Tamil Nadu, India. We also have branches in Trichy, Namakkal, and Coimbatore."
          }
        },
        {
          "@type": "Question",
          "name": "How can I book a tour package?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contact us via WhatsApp at +91 9597371949 or call us directly. You can also fill the enquiry form on our website for a custom quote."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in tour packages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our packages typically include transport arrangements, accommodation (3 sharing basis), sightseeing entry tickets, food & refreshments, campfire/activity experiences, all taxes, and driver allowance with fuel, toll & parking."
          }
        }
      ]
    }, 'schema-faq');
  }
}
