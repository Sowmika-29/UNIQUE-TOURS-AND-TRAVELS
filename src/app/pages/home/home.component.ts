import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { HeroSliderComponent } from '../../components/home/hero-slider/hero-slider.component';
import { CategoryCardsComponent } from '../../components/home/category-cards/category-cards.component';
import { TopDestinationsComponent } from '../../components/home/top-destinations/top-destinations.component';
import { ReviewSliderComponent } from '../../components/home/review-slider/review-slider.component';
import { StatsCounterComponent } from '../../components/home/stats-counter/stats-counter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSliderComponent, 
    CategoryCardsComponent, 
    TopDestinationsComponent, 
    StatsCounterComponent,
    ReviewSliderComponent
  ],
  template: `
    <app-hero-slider></app-hero-slider>
    <app-category-cards></app-category-cards>
    <app-top-destinations></app-top-destinations>
    <app-stats-counter></app-stats-counter>
    <app-review-slider></app-review-slider>
  `
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Best Domestic & International Tour Packages',
      description: 'Unique Tours & Travels offers premium and affordable tour packages for Kerala, Goa, Dubai, Bali, and more. Plan your dream vacation with our curated itineraries.',
      keywords: 'travel agency, tour packages, Kerala tours, international trips, vacation planning, Unique Tours & Travels',
      url: '/',
      type: 'website'
    });

    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Unique Tours & Travels",
      "description": "Unique Tours & Travels offers curated domestic and international travel packages.",
      "url": "https://uniquetours.in",
      "telephone": "+919597371949",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    });
  }
}
